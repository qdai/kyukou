import { Alert, AlertTitle, LinearProgress, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { logNames, site } from '../../constant';
import Container from '../Container';
import axios from 'axios';
import formatLog from './format-log';
import { useQuery } from 'react-query';

const fetchLog = async logName => {
  const { data } = await axios.get(`${site.url}/api/1/logs/${logName}.json`);
  return data;
};
const fetchLogs = () => Promise.all(logNames.map(fetchLog));

const Status = () => {
  const { status, data: logs = [], error } = useQuery('logs', fetchLogs, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      {(status === 'loading' || status === 'idle') && <LinearProgress />}
      <Container>
        {error && (
          <Typography
            color="error"
            paragraph
          >
            {error.message}
          </Typography>
        )}
        {logs.map(formatLog).map(({ elapsedTime, level, log, name, time }) => (
          <Alert
            key={name}
            severity={level}
            sx={{ marginBottom: 2 }}
          >
            <AlertTitle component="h3">
              {`${name} (${elapsedTime} ms) `}
            </AlertTitle>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              <time>
                {time}
              </time>
            </Typography>
            <Typography component="pre">
              <code>
                {log}
              </code>
            </Typography>
          </Alert>
        ))}
      </Container>
    </Fragment>
  );
};

export default Status;
