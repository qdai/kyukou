import { Card, CardContent, LinearProgress, List, Typography, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { logNames, site } from '../../constant';
import axios from 'axios';
import formatLog from './format-log';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  error: { backgroundColor: theme.palette.error.light },
  info: { backgroundColor: theme.palette.info.light },
  success: { backgroundColor: theme.palette.success.light },
  warning: { backgroundColor: theme.palette.warning.light }
}));

const fetchLog = async logName => {
  const { data } = await axios.get(`${site.url}/api/1/logs/${logName}.json`);
  return data;
};
const fetchLogs = () => Promise.all(logNames.map(fetchLog));

const Status = () => {
  const classes = useStyles();
  const { status, data: logs = [], error } = useQuery('logs', fetchLogs);

  return (
    <Fragment>
      {status === 'loading' && <LinearProgress />}
      {error && (
        <Typography paragraph>
          {error.message}
        </Typography>
      )}
      <List>
        {logs.map(formatLog).map(({ elapsedTime, level, log, name, time }) => (
          <Card key={name}>
            <CardContent className={classes[level]}>
              <Typography
                color="textSecondary"
                gutterBottom
              >
                <time>
                  {time}
                </time>
              </Typography>
              <Typography
                component="h2"
                variant="h5"
              >
                {`${name} (${elapsedTime} ms) `}
              </Typography>
              <Typography paragraph>
                <pre>
                  {log}
                </pre>

              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Fragment>
  );
};

export default Status;
