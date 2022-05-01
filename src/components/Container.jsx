import { Container as MUIContainer } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({ container: { padding: theme.spacing(3, 2) } }));

const Settings = ({ children }) => {
  const classes = useStyles();

  return (
    <MUIContainer classes={{ root: classes.container }}>
      {children}
    </MUIContainer>
  );
};

Settings.propTypes = { children: PropTypes.node.isRequired };

export default Settings;
