import React, { PropTypes } from 'react';

const InputText = ({ id, name, required = false }) =>
  <span>
    <label htmlFor={id}>{name}</label>{' '}
    <input
      className="form-control"
      id={id}
      name={name}
      required={required}
      type="text"
    />
  </span>;

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export default InputText;
