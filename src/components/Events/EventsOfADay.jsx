import { ListItem, ListItemText, ListSubheader } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  subheader: {
    backgroundColor: theme.palette.grey[50],
    top: theme.spacing(7)
  },
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { subheader: { top: theme.spacing(6) } },
  [theme.breakpoints.up('sm')]: { subheader: { top: theme.spacing(8) } },
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}));

const EventsOfADay = ({ data, date, dateFormatted }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <ListSubheader
        classes={{ root: classes.subheader }}
        component="h3"
        title={date}
      >
        {dateFormatted}
      </ListSubheader>
      <ul className={classes.ul}>
        {data.map(({ about, department, hash, period, raw, subject }) => (
          <li key={hash}>
            <ListItem
              button
              component={Link}
              title={raw}
              to={`/events/${hash}`}
            >
              <ListItemText
                primary={`${about} ${subject}`}
                secondary={`${department} ${period}時限`}
              />
            </ListItem>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

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
