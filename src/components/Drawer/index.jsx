import DrawerContent from './DrawerContent';
import React from 'react';
import SwipeableDrawer from './SwipeableDrawer';
import useAppContext from '../../hooks/use-app-context';

const Drawer = () => {
  const { closeDrawer: handleCloseDrawer, drawerOpen, openDrawer: handleOpenDrawer } = useAppContext();

  return (
    <SwipeableDrawer
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      open={drawerOpen}
    >
      <DrawerContent />
    </SwipeableDrawer>
  );
};

export { Drawer };

export default Drawer;
