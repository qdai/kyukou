import { LinearProgress, List, Typography } from '@material-ui/core';
import React, { Fragment, Suspense, lazy, useContext } from 'react';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import Container from '../Container';
import EventsOfADay from './EventsOfADay';
import createEventsFilter from './create-events-filter';
import createEventsOfADay from './create-events-of-a-day';
import { site } from '../../constant';
import useEvents from '../../hooks/use-events';
import useSettings from '../../hooks/use-settings';

// eslint-disable-next-line import/max-dependencies
const Fab = lazy(() => import(/* webpackChunkName: "events-fab" */'./Fab'));

const Events = () => {
  const { isAdmin } = useContext(AppContext);
  const { status, events, error } = useEvents();
  const { selectedAbouts, selectedDepartments } = useSettings();

  const filteredEvents = events.filter(createEventsFilter(selectedAbouts, selectedDepartments));

  return (
    <Fragment>
      <AppBar>
        {site.name}
      </AppBar>
      {(status === 'loading' || status === 'idle') && <LinearProgress />}
      <Container>
        {status === 'error'
          ? (
            <Typography
              color="error"
              paragraph
            >
              {error.message}
            </Typography>
          )
          : (
            <Typography
              align="right"

            >
              {`表示中：${filteredEvents.length}/${events.length}`}
            </Typography>
          )}
        {(status === 'success' && filteredEvents.length === 0) && (
          <Typography paragraph>
            {`${selectedDepartments.join('、')}の${selectedAbouts.join('、')}に関する情報はありません。`}
          </Typography>
        )}
        {status === 'success' && (
          <List>
            {createEventsOfADay(filteredEvents).map(daysEvents => (
              <li key={daysEvents.date}>
                <EventsOfADay {...daysEvents} />
              </li>
            ))}
          </List>
        )}
        {isAdmin && (
          <Suspense fallback={<LinearProgress />}>
            <Fab />
          </Suspense>
        )}
      </Container>
    </Fragment>
  );
};

export default Events;
