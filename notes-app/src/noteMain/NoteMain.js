import React, { Component } from 'react';
import Note from '../note/Note';

import NotesContext from '../context/NotesContext';

export default class NoteMain extends Component {
  static contextType = NotesContext;

  handleDeleteNote = () => {
    console.log('Called in NoteMain: Redirecting Home');
    this.props.history.push(`/`);
  };

  render() {
    const { notes } = this.context;
    const { noteId } = this.props.match.params;

    console.log(typeof noteId);

    return (
      <>
        {notes.map(
          note =>
            note.id === noteId && (
              <section className='notes__item' key={note.id} aria-live='polite'>
                <Note note={note} onDeleteNote={this.handleDeleteNote} />
                {note.content.split(/\n \r|\n/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>
            )
        )}
      </>
    );
  }
}
