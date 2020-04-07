import { CircularProgress, Link, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Launch as LaunchIcon } from '@material-ui/icons';
import useEvents from '../../hooks/use-events';
import { useParams } from 'react-router-dom';

const Event = () => {
  const { hash } = useParams();
  const { error, events, status } = useEvents();

  if (status === 'loading') {
    return <CircularProgress />;
  }
  if (status === 'error') {
    return (
      <Typography paragraph>
        {error.message}
      </Typography>
    );
  }

  const event = events.find(e => e.hash === hash);
  if (!event) {
    return (
      <Typography paragraph>
        {`${hash} not found`}
      </Typography>
    );
  }

  return (
    <Fragment>
      <Typography variant="h2">
        {`${event.about} ${event.subject}`}
      </Typography>
      <Typography paragraph>
        {event.date}
      </Typography>
      <Typography paragraph>
        {`${event.department} ${event.period}時限`}
      </Typography>
      <ul>
        <li>
          {event.department}
        </li>
        <li>
          {`教員：${event.teacher}`}
        </li>
        {event.note ? (
          <li>
            {`備考：${event.note}`}
          </li>
        ) : null}
        {event.campus ? (
          <li>
            {`キャンパス：${event.campus}`}
          </li>
        ) : null}
        {event.room ? (
          <li>
            {`教室：${event.room}`}
          </li>
        ) : null}
      </ul>
      <Typography paragraph>
        <Link
          href={event.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {'情報取得元'}
          <LaunchIcon />
        </Link>
      </Typography>
    </Fragment>
  );
};

export default Event;
