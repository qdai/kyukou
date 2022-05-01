import { Alert, AlertTitle, LinearProgress, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { logNames, site } from '../../constant';
import Container from '../Container';
import axios from 'axios';
import formatLog from './format-log';
import { makeStyles } from '@mui/styles';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({ alert: { marginBottom: theme.spacing(2) } }));

const fetchLog = async logName => {
  const { data } = await axios.get(`${site.url}/api/1/logs/${logName}.json`);
  return data;
};
const fetchLogs = () => Promise.all(logNames.map(fetchLog));

const Status = () => {
  const classes = useStyles();
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
            classes={{ root: classes.alert }}
            key={name}
            severity={level}
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
