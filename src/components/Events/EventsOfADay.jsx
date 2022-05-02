import { ListItem, ListItemText, ListSubheader, styled } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StickyListSubheader = styled(ListSubheader)(({ theme }) => ({
  top: theme.spacing(7),
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { top: theme.spacing(6) },
  [theme.breakpoints.up('sm')]: { top: theme.spacing(8) }
}));

const Ul = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  padding: 0
}));

const EventsOfADay = ({ data, date, dateFormatted }) => (
  <Fragment>
    <StickyListSubheader
      component="h3"
      title={date}
    >
      {dateFormatted}
    </StickyListSubheader>
    <Ul>
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
    </Ul>
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
