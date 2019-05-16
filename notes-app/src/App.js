import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import AddFolder from './addFolder/AddFolder';
import AddNote from './addNote/AddNote';
import NotesError from './notesError/NotesError';
import FoldersError from './foldersError/FoldersError';

import { config } from './config/config';

import './App.css';
import './assets/variables.css';

import FolderNav from './folderNav/FolderNav';
import NoteList from './noteList/NoteList';
import NoteSidebar from './noteSidebar/NoteSidebar';
import NoteMain from './noteMain/NoteMain';

import NotesContext from './context/NotesContext';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // startup noteful-json-server server or uncomment below and import store.js
    // fake data loading from API call
    // setTimeout(() => this.setState(STORE), 600);

    const url = config.API_ENDPOINT;

    Promise.all([fetch(`${url}/notes`), fetch(`${url}/folders`)])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    console.log(`Deleted note: ${noteId}`);

    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId),
    });
  };

  handleAddFolder = folder => {
    const addedObject = Object.entries(folder);
    console.log(`Added folder: ${addedObject}`);
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    };

    return (
      <div className='App'>
        <NotesContext.Provider value={contextValue}>
          <header className='App-header'>
            <NavLink to='/'>
              <h1 className='logo'>Notes</h1>
            </NavLink>
            <section className='add-buttons'>
              <AddFolder />
              <NavLink
                to='/add-note'
                className='note__button note__button--link'
              >
                Add Note
              </NavLink>
            </section>
          </header>
          <FoldersError>
            <aside className='folders' aria-live='polite'>
              <Route exact path='/' component={FolderNav} />
              <Route exact path='/folder/:folderId' component={FolderNav} />
              <Route exact path='/note/:noteId' component={NoteSidebar} />
            </aside>
          </FoldersError>
          <NotesError>
            <main className='notes' aria-live='polite'>
              <Route exact path='/' component={NoteList} />
              <Route exact path='/folder/:folderId' component={NoteList} />
              <Route exact path='/note/:noteId' component={NoteMain} />
              <Route exact path='/add-note' component={AddNote} />
            </main>
          </NotesError>
        </NotesContext.Provider>
      </div>
    );
  }
}

export default App;
