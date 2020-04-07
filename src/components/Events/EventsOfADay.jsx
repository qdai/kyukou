import { ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventsOfADay = ({ data, date, dateFormatted }) => (
  <Fragment>
    <ListSubheader title={date}>
      {dateFormatted}
    </ListSubheader>
    {data.map(({ about, department, hash, period, raw, subject }) => (
      <ListItem
        button
        component={Link}
        key={hash}
        title={raw}
        to={`/events/${hash}`}
      >
        <ListItemText
          primary={`${about} ${subject}`}
          secondary={`${department} ${period}時限`}
        />
      </ListItem>
    ))}
  </Fragment>
);

EventsOfADay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    about: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    raw: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired
  }).isRequired).isRequired,
  date: PropTypes.string.isRequired,
  dateFormatted: PropTypes.string.isRequired
};

export default EventsOfADay;
