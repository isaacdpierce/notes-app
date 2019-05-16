import React, { Component } from 'react';

import './AddFolder.css';

import NotesContext from '../context/NotesContext';

import { config } from '../config/config';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showButton: true,
      folderName: 'Untitled',
    };
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  static contextType = NotesContext;

  handleAddFormButton() {
    this.setState({
      showForm: true,
      showButton: false,
    });
  }

  handleInput(folderName) {
    this.setState({ folderName });
  }

  handleSubmit = e => {
    e.preventDefault();

    const folder = {
      name: this.state.folderName,
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`folder/${folder.id}`);
      })
      .catch(error => {
        console.error({ error });
      });

    this.setState({
      showButton: true,
      showForm: false,
      folderName: 'Untitled',
    });
  };

  render() {
    const { showForm, showButton } = this.state;
    return (
      <>
        {showButton && (
          <>
            <button
              className='note__button button__add-folder '
              onClick={() => this.handleAddFormButton()}
            >
              Add Folder
            </button>
          </>
        )}
        {showForm && (
          <form className='form__add-folder'>
            <input
              type='text'
              id='folder-name-input'
              name='folder-name'
              defaultValue='Untitled'
              onChange={e => this.handleInput(e.target.value)}
            />
            <button
              className='button__submit-folder'
              type='submit'
              onClick={e => this.handleSubmit(e)}
            >
              +
            </button>
          </form>
        )}
      </>
    );
  }
}
