import { CircularProgress, Container, List, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { logNames, site } from '../../constant';
import AppBar from '../AppBar';
import Log from './Log';
import axios from 'axios';
import formatLog from './format-log';
import { useQuery } from 'react-query';

const fetchLog = async logName => {
  const { data } = await axios.get(`${site.url}/api/1/logs/${logName}.json`);
  return data;
};
const fetchLogs = () => Promise.all(logNames.map(fetchLog));

const Status = () => {
  const { status, data: logs = [], error } = useQuery('logs', fetchLogs);

  return (
    <Fragment>
      <AppBar>
        {'Status'}
      </AppBar>
      <Container>
        {status === 'loading' && <CircularProgress />}
        {error && (
          <Typography paragraph>
            {error.message}
          </Typography>
        )}
        <List>
          {logs.map(formatLog).map(log => (
            <Log
              key={log.name}
              {...log}
            />
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default Status;
