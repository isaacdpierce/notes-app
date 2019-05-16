import React, { Component } from 'react';
import Note from '../note/Note';

import './NoteList.css';

import NotesContext from '../context/NotesContext';

export default class noteList extends Component {
  static contextType = NotesContext;
  render() {
    const { notes } = this.context;
    const { folderId } = this.props.match.params;

    if (!folderId) {
      return (
        <section className='notes__list'>
          {notes.map(note => (
            <div className='notes__item' key={note.id}>
              <Note note={note} />
            </div>
          ))}
        </section>
      );
    } else {
      return (
        <section className='notes__list'>
          {notes
            .filter(note => note.folderId === folderId)
            .map(note => (
              <div className='notes__item' key={note.id} aria-live='polite'>
                <Note note={note} />
              </div>
            ))}
        </section>
      );
    }
  }
}
