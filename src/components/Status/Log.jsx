import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  error: { backgroundColor: theme.palette.error.light },
  info: { backgroundColor: theme.palette.info.light },
  success: { backgroundColor: theme.palette.success.light },
  warning: { backgroundColor: theme.palette.warning.light }
}));

const Log = ({ elapsedTime, level, log, name, time }) => {
  const classes = useStyles();

  return (
    <Card>
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
  );
};

Log.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  log: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default Log;
