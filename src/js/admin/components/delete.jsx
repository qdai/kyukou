import React, { PropTypes } from 'react';
import InputText from './input-text.jsx';
import SubmitButton from './submit-button.jsx';

const Delete = ({ handleSubmit }) =>
  <div>
    <h2 className="sr-only">{'Delete'}</h2>
    <form
      className="form-inline"
      onSubmit={handleSubmit}
      role="form"
    >
      <p>
        <InputText
          id="delete-hash"
          name="hash"
          required
        />
      </p>
      <p>
        <SubmitButton bsStyle="danger">{'Delete'}</SubmitButton>
      </p>
    </form>
  </div>;

Delete.propTypes = { handleSubmit: PropTypes.func.isRequired };

export default Delete;
