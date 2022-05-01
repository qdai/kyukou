import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Fab as MUIFab } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    bottom: theme.spacing(2),
    position: 'fixed',
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar
  }
}));

const Fab = () => {
  const classes = useStyles();

  return (
    <MUIFab
      classes={{ root: classes.fab }}
      color="primary"
      component={Link}
      to="/events"
    >
      <AddIcon />
    </MUIFab>
  );
};

export default Fab;
