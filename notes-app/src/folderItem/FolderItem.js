import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './FolderItem.css';

export default class FolderItem extends Component {
  render() {
    const { folder } = this.props;

    return (
      <li className='folders__item'>
        <NavLink
          to={`/folder/${folder.id}`}
          activeClassName='folder-active'
          className='folders__link'
        >
          {folder.name}
        </NavLink>
      </li>
    );
  }
}

FolderItem.propTypes = {
  folder: PropTypes.object,
};
