import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NotesContext from '../context/NotesContext';
import ValidationError from '../validationError/ValidationError';

import { config } from '../config/config';

import './AddNote.css';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      folderId: '',
      modified: '',
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: '',
      },
    };
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  static contextType = NotesContext;

  handleNameChange(e) {
    const name = e.target.value;

    this.setState({ name }, () => {
      this.validateName(name);
    });
  }

  handleContentChange(e) {
    const content = e.target.value;
    this.setState({
      content,
    });
  }

  handleSelectChange(e) {
    const folderId = e.target.value;

    this.setState({
      folderId,
    });
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError,
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid,
    });
  }

  handleAddNoteSubmit(e) {
    const { name, content, folderId } = this.state;

    e.preventDefault();

    const newNote = {
      name,
      content,
      folderId,
      modified: new Date().toISOString(),
    };

    if (!this.state.formValid) {
      if (this.state.validationMessages.name === '')
        this.setState({
          validationMessages: {
            name: 'Please enter a name',
          },
        });
    } else {
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e));
          return res.json();
        })
        .then(note => {
          this.context.addNote(note);
          this.props.history.push(`/folder/${note.folderId}`);
        })
        .catch(error => {
          console.error({ error });
        });
    }
  }

  render() {
    const { folders = [] } = this.context;

    return (
      <section className='add-note'>
        <form action='#' className='add-note__form'>
          <legend>Add a new note</legend>
          <div>
            <label htmlFor='name'>
              name <span className='requiredField'>(required)</span>
            </label>

            <input
              type='text'
              id='name'
              className='add-note__input'
              aria-required='true'
              onChange={e => this.handleNameChange(e)}
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>

          <div>
            <label htmlFor='content'>Content</label>
            <textarea
              type='text'
              id='content'
              className='add-note__input'
              onChange={e => this.handleContentChange(e)}
            />
          </div>
          <div className='add-note__select'>
            <label htmlFor='folder-select'>Select a folder</label>
            <select
              name='folder-select'
              id='folder-select'
              className='folder-select'
              onChange={e => this.handleSelectChange(e)}
            >
              <option value={null}>...</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className='add-note__buttons'>
            <NavLink to='/' className='add-note__link'>
              Cancel
            </NavLink>
            <button
              className='add-note__button'
              // disabled={!this.state.formValid}
              onClick={e => this.handleAddNoteSubmit(e)}
            >
              Add note
            </button>
          </div>
        </form>
      </section>
    );
  }
}
