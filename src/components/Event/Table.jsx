import { Button, LinearProgress, Typography } from '@material-ui/core';
import Container from '../Container';
import { Launch as LaunchIcon } from '@material-ui/icons';
import React from 'react';
import useEvents from '../../hooks/use-events';
import { useParams } from 'react-router-dom';

const Event = () => {
  const { hash } = useParams();
  const { error, events, status } = useEvents();

  if (status === 'loading') {
    return <LinearProgress />;
  }
  if (status === 'error') {
    return (
      <Container>
        <Typography
          color="error"
          paragraph
        >
          {error.message}
        </Typography>
      </Container>
    );
  }

  const event = events.find(e => e.hash === hash);
  if (!event) {
    return (
      <Container>
        <Typography paragraph>
          {`${hash} not found`}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography paragraph>
        <time dateTime={event.eventDate}>
          {event.date}
        </time>
      </Typography>
      <Typography
        component="h3"
        gutterBottom
        variant="h5"
      >
        {`${event.about} ${event.subject}`}
      </Typography>
      <ul>
        <li>
          {event.department}
        </li>
        <li>
          {`${event.period}時限`}
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
      <Typography
        color="textSecondary"
        paragraph
        variant="body2"
      >
        {`（元データ：${event.raw}）`}
        {event.raw}
      </Typography>
      <Typography paragraph>
        <Button
          endIcon={<LaunchIcon />}
          href={event.link}
          rel="noopener noreferrer"
          target="_blank"
          variant="outlined"
        >
          {'情報取得元'}
        </Button>
      </Typography>
    </Container>
  );
};

export default Event;
