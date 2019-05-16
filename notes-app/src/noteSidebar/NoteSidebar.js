import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NoteSidebar.css';
import { findNote, findFolder } from '../helpers';

import NotesContext from '../context/NotesContext';

export default class NoteSidebar extends Component {
  static contextType = NotesContext;

  render() {
    const { folders, notes } = this.context;

    const { noteId } = this.props.match.params;

    const note = findNote(notes, noteId) || {};

    const folder = findFolder(folders, note.folderId);

    return (
      <div className='folders__item note-page__item'>
        {folder && <p className='folder__name'>{folder.name}</p>}
        <NavLink to='/'>Go back</NavLink>
      </div>
    );
  }
}
