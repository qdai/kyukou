import { Box, SwipeableDrawer as MUISwipeableDrawer, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const DrawerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: '80vw',
  width: '320px'
}));

const SwipeableDrawer = ({ children, ...props }) => (
  <MUISwipeableDrawer {...props}>
    <DrawerContainer>
      {children}
    </DrawerContainer>
  </MUISwipeableDrawer>
);

SwipeableDrawer.propTypes = { children: PropTypes.node };

SwipeableDrawer.defaultProps = { children: null };

export default SwipeableDrawer;
