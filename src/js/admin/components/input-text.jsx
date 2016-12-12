import React, { PropTypes } from 'react';

const InputText = ({ id, name, required }) => {
  const requiredLabel = required ? <span>{'*'}</span> : null;
  return (
    <span>
      <label htmlFor={id}>{name}{requiredLabel}</label>{' '}
      <input
        className="form-control"
        id={id}
        name={name}
        required={required}
        type="text"
      />
    </span>
  );
};

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool
};

InputText.defaultProps = { required: false };

export default InputText;
