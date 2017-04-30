import PropTypes from 'prop-types';
import React from 'react';

const SubmitButton = ({ bsStyle, children }) =>
  <button
    className={`btn btn-lg btn-${bsStyle}`}
    type="submit"
  >
    {children}
  </button>;

SubmitButton.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default SubmitButton;

