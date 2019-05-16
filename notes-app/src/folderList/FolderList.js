import React, { Component } from 'react';
import FolderItem from '../folderItem/FolderItem';

import './FolderList.css';

import NotesContext from '../context/NotesContext';

class FolderList extends Component {
  static contextType = NotesContext;

  render() {
    const { folders } = this.context;

    return (
      <ul>
        {folders.map(folder => (
          <FolderItem
            key={folder.id}
            className='folders__item'
            folder={folder}
          />
        ))}
      </ul>
    );
  }
}

export default FolderList;
