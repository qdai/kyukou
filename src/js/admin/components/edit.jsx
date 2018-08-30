import React, { Fragment } from 'react';
import InputText from './input-text.jsx';
import PropTypes from 'prop-types';
import SubmitButton from './submit-button.jsx';
import { eventKeys } from '../../utils/constant';

const Edit = ({ handleSubmit }) => (
  <Fragment>
    <h2 className="sr-only">
      {'Edit'}
    </h2>
    <form
      className="form-inline"
      onSubmit={handleSubmit}
      role="form"
    >
      <p>
        <InputText
          id="edit-hash"
          name="hash"
          required
        />
      </p>
      <p>
        <label htmlFor="edit-key">
          {'key'}
        </label>
        {' '}
        <select
          className="form-control"
          id="edit-key"
          name="key"
          required
        >
          {eventKeys.map(key => {
            if (key === 'hash') {
              return null;
            }
            return (
              <option
                key={key}
                value={key}
              >
                {key}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        <InputText
          id="edit-value"
          name="value"
          required
        />
      </p>
      <p>
        <SubmitButton bsStyle="primary">
          {'Edit'}
        </SubmitButton>
      </p>
    </form>
  </Fragment>
);

Edit.propTypes = { handleSubmit: PropTypes.func.isRequired };

export default Edit;
