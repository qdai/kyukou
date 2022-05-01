import { Fab as MUIFab, styled } from '@mui/material';

const Fab = styled(MUIFab)(({ theme }) => ({
  bottom: theme.spacing(2),
  position: 'fixed',
  right: theme.spacing(2),
  zIndex: theme.zIndex.appBar
}));

export default Fab;
