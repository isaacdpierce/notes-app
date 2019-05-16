import React, { Component } from 'react';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Note.css';

import { config } from '../config/config';

import NotesContext from '../context/NotesContext';

export default class Note extends Component {
  static contextType = NotesContext;

  static defaultProps = {
    onDeleteNote: () => {},
  };

  // send server DELETE request
  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.note.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { note } = this.props;

    return (
      <header className='note__header'>
        <div>
          <NavLink to={`/note/${note.id}`}>
            <h1>{note.name}</h1>
          </NavLink>

          <p>{format(note.modified, 'MMM Do YYYY')}</p>
        </div>
        <div className='buttons__wrapper'>
          <NavLink
            to={`/note/${note.id}`}
            type='button'
            className='note__button note__button--link'
          >
            Open Note
          </NavLink>

          <button
            type='button'
            className='note__button'
            onClick={this.handleClickDelete}
          >
            Delete Note
          </button>
        </div>
      </header>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object,
  onDeleteNote: PropTypes.func,
};
