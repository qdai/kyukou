import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, SwipeableDrawer } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import Add from './Add';
import AppContext from '../app-context';
import DrawerContent from './DrawerContent';
import Event from './Event';
import Events from './Events';
import PropTypes from 'prop-types';
import Settings from './Settings';
import SnackbarDismiss from './SnackbarDismiss';
import { SnackbarProvider } from 'notistack';
import Status from './Status'; // eslint-disable-line import/max-dependencies

const App = ({ admin = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        admin,
        setDrawerOpen
      }}
    >
      <SnackbarProvider action={key => <SnackbarDismiss id={key} />}>
        <CssBaseline />
        <BrowserRouter>
          <Fragment>
            <SwipeableDrawer
              onClose={() => setDrawerOpen(false)}
              onOpen={() => setDrawerOpen(true)}
              open={drawerOpen}
            >
              <DrawerContent />
            </SwipeableDrawer>
            <Switch>
              <Route
                component={Events}
                exact
                path="/"
              />
              <Route
                component={Settings}
                exact
                path="/settings"
              />
              <Route
                component={Status}
                exact
                path="/status"
              />
              <Route
                component={Add}
                exact
                path="/events"
              />
              <Route
                component={Event}
                exact
                path="/events/:hash"
              />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </SnackbarProvider>
    </AppContext.Provider>
  );
};

App.propTypes = { admin: PropTypes.bool };

App.defaultProps = { admin: false };

export default App;
