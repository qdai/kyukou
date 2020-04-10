import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Fab as MUIFab } from '@material-ui/core';
import React from 'react';

const Fab = () => (
  <MUIFab
    color="primary"
    component={Link}
    to="/events"
  >
    <AddIcon />
  </MUIFab>
);

export default Fab;
