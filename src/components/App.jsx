import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, LinearProgress, SwipeableDrawer } from '@material-ui/core';
import React, { Fragment, Suspense, lazy, useState } from 'react';
import AppContext from '../app-context';
import DrawerContent from './DrawerContent';
import ErrorBoundary from './ErrorBoundary';
import Event from './Event';
import Events from './Events';
import PropTypes from 'prop-types';
import Settings from './Settings';
import SnackbarDismiss from './SnackbarDismiss';
import { SnackbarProvider } from 'notistack';
import Status from './Status';// eslint-disable-line import/max-dependencies

const Add = lazy(() => import('./Add'));

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
            <ErrorBoundary>
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
                  exact
                  path="/events"
                >
                  <Suspense fallback={<LinearProgress />}>
                    <Add />
                  </Suspense>
                </Route>
                <Route
                  component={Event}
                  exact
                  path="/events/:hash"
                />
              </Switch>
            </ErrorBoundary>
          </Fragment>
        </BrowserRouter>
      </SnackbarProvider>
    </AppContext.Provider>
  );
};

App.propTypes = { admin: PropTypes.bool };

App.defaultProps = { admin: false };

export default App;
