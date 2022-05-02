import { Fab as MUIFab, styled } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';

const StyledFab = styled(MUIFab)(({ theme }) => ({
  bottom: theme.spacing(2),
  position: 'fixed',
  right: theme.spacing(2),
  zIndex: theme.zIndex.appBar
}));

const Fab = () => (
  <StyledFab
    color="primary"
    component={Link}
    to="/events"
  >
    <AddIcon />
  </StyledFab>
);

export default Fab;
