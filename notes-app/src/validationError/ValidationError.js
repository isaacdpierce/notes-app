import React from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css';

export default function ValidationError(props) {
  if (props.hasError) {
    return <p className='error'>{props.message}</p>;
  }

  return <></>;
}

ValidationError.propTypes = {
  hasError: PropTypes.bool,
  message: PropTypes.string,
};
