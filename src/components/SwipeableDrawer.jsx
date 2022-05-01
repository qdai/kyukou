import { SwipeableDrawer as MUISwipeableDrawer } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  drawer: {
    maxWidth: '80vw',
    width: '320px'
  }
}));

const SwipeableDrawer = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MUISwipeableDrawer
      classes={{ paper: classes.drawer }}
      {...props}
    >
      {children}
    </MUISwipeableDrawer>
  );
};

SwipeableDrawer.propTypes = { children: PropTypes.node };

SwipeableDrawer.defaultProps = { children: null };

export default SwipeableDrawer;
