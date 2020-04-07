import { CircularProgress, Container, Fab, List, Typography } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { Add as AddIcon } from '@material-ui/icons';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import EventsOfADay from './EventsOfADay';
import { Link } from 'react-router-dom';
import createEventsFilter from './create-events-filter';
import createEventsOfADay from './create-events-of-a-day';
import { site } from '../../constant';
import useEvents from '../../hooks/use-events';
import useSettings from '../../hooks/use-settings'; // eslint-disable-line import/max-dependencies

const Events = () => {
  const { admin } = useContext(AppContext);
  const { status, events, error } = useEvents();
  const { selectedAbouts, selectedDepartments } = useSettings();

  const filteredEvents = events.filter(createEventsFilter(selectedAbouts, selectedDepartments));

  return (
    <Fragment>
      <AppBar>
        {site.name}
      </AppBar>
      <Container>
        {status === 'loading' && <CircularProgress />}
        {error
          ? (
            <Typography paragraph>
              {error.message}
            </Typography>
          ) : (
            <Typography paragraph>
              {`表示中：${filteredEvents.length}/${events.length}`}
            </Typography>
          )}
        {filteredEvents.length === 0 && !error ? (
          <Typography paragraph>
            {`${selectedDepartments.join('、')}の${selectedAbouts.join('、')}に関する情報はありません。`}
          </Typography>
        ) : null}
        <List subheader={<li />}>
          {createEventsOfADay(filteredEvents).map(daysEvents => (
            <li key={daysEvents.date}>
              <ul>
                <EventsOfADay {...daysEvents} />
              </ul>
            </li>
          ))}
        </List>
        {admin && (
          <Fab
            color="primary"
            component={Link}
            to="/events"
          >
            <AddIcon />
          </Fab>
        )}
      </Container>
    </Fragment>
  );
};

export default Events;
