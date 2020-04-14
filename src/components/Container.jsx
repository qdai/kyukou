import { Container as MUIContainer, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(4)
  }
}));

const Settings = ({ children }) => {
  const classes = useStyles();

  return (
    <MUIContainer className={classes.container}>
      {children}
    </MUIContainer>
  );
};

Settings.propTypes = { children: PropTypes.node.isRequired };

export default Settings;
