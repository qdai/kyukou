import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { eventKeys } from '../constant';

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

const EventsController = ({ control, defaultValues }) => (
  <Fragment>
    {eventKeys.map(key => {
      if (key === 'hash') {
        return null;
      }
      return (
        <Controller
          as={(
            <TextField
              defaultValue={defaultValues && defaultValues[key]}
              fullWidth
              label={key}
              margin="normal"
              required={requiredKeys.includes(key)}
              type="text"
            />
          )}
          control={control}
          key={key}
          name={key}
        />
      );
    })}
  </Fragment>
);

EventsController.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  defaultValues: PropTypes.shape({
    about: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    pubDate: PropTypes.string.isRequired,
    raw: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    'tweet.new': PropTypes.string.isRequired,
    'tweet.tomorrow': PropTypes.string.isRequired
  }).isRequired
};

export default EventsController;
