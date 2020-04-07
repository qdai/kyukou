import { ArrowBack as ArrowBackIcon, Menu as MenuIcon } from '@material-ui/icons';
import { IconButton, AppBar as MUIAppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';
import AppContext from '../app-context';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({ menuButton: { marginRight: theme.spacing(2) } }));

const AppBar = ({ children = null }) => {
  const classes = useStyles();
  const { setDrawerOpen } = useContext(AppContext);

  return (
    <Fragment>
      <MUIAppBar>
        <Toolbar>
          <Switch>
            <Route
              exact
              path="/"
            >
              <IconButton
                className={classes.menuButton}
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Route>
            <Route
              path="*"
            >
              <IconButton
                className={classes.menuButton}
                color="inherit"
                component={Link}
                edge="start"
                to="/"
              >
                <ArrowBackIcon />
              </IconButton>
            </Route>
          </Switch>
          <Typography
            component="h2"
            variant="h6"
          >
            {children}
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <Toolbar />
    </Fragment>
  );
};

AppBar.propTypes = { children: PropTypes.node };

AppBar.defaultProps = { children: null };

export default AppBar;
