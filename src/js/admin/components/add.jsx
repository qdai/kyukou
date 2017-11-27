import InputText from './input-text.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import SubmitButton from './submit-button.jsx';
import { eventKeys } from '../../utils/constant';

const requiredKeys = [
  'about',
  'link',
  'eventDate',
  'pubDate',
  'period',
  'department',
  'subject',
  'raw',
  'tweet.new',
  'tweet.tomorrow'
];

const Add = ({ handleSubmit }) => (
  <div>
    <h2 className="sr-only">
      {'Add'}
    </h2>
    <form
      className="form-inline"
      onSubmit={handleSubmit}
      role="form"
    >
      {eventKeys.map(key => {
        if (key === 'hash') {
          return null;
        }
        const id = `add-${key}`;
        return (
          <p key={id}>
            <InputText
              id={id}
              name={key}
              required={requiredKeys.indexOf(key) >= 0}
            />
          </p>
        );
      })}
      <p>
        <SubmitButton bsStyle="primary">
          {'Add'}
        </SubmitButton>
      </p>
    </form>
  </div>
);

Add.propTypes = { handleSubmit: PropTypes.func.isRequired };

export default Add;
