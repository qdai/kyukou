import { Box, SwipeableDrawer, styled } from '@mui/material';
import DrawerContent from './DrawerContent';
import useAppContext from '../../hooks/use-app-context';

const DrawerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: '80vw',
  width: '320px'
}));

const Drawer = () => {
  const { closeDrawer: handleCloseDrawer, drawerOpen, openDrawer: handleOpenDrawer } = useAppContext();

  return (
    <SwipeableDrawer
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      open={drawerOpen}
    >
      <DrawerContainer>
        <DrawerContent />
      </DrawerContainer>
    </SwipeableDrawer>
  );
};

export { Drawer };

export default Drawer;
