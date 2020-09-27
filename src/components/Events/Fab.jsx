import { Fab as MUIFab, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';

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
