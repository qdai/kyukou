import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, LinearProgress, SwipeableDrawer, ThemeProvider, makeStyles } from '@material-ui/core';
import React, { Fragment, Suspense, lazy, useCallback, useState } from 'react';
import AppContext from './app-context';
import DrawerContent from './components/DrawerContent';
import ErrorBoundary from './components/ErrorBoundary';
import Event from './components/Event';
import Events from './components/Events';
import ReactDOM from 'react-dom';
import Settings from './components/Settings';
import SnackbarDismiss from './components/SnackbarDismiss';
import { SnackbarProvider } from 'notistack';
import Status from './components/Status';
import axios from 'axios';
import { site } from './constant';
import theme from './theme';
import { useEffectOnce } from 'react-use'; // eslint-disable-line import/max-dependencies

const Add = lazy(() => import(/* webpackChunkName: "add" */'./components/Add'));
const Login = lazy(() => import(/* webpackChunkName: "login" */'./components/Login'));

const useStyles = makeStyles(() => ({
  drawer: {
    maxWidth: '80vw',
    width: '320px'
  }
}));

const App = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);
  const handleOpenDrawer = useCallback(() => setDrawerOpen(true), [setDrawerOpen]);

  useEffectOnce(() => {
    const checkIsAdmin = async () => {
      const { data } = await axios.get(`${site.url}/admin`);
      setIsAdmin(data.isAdmin === true);
    };
    checkIsAdmin();
  });

  const dismissAction = useCallback(key => <SnackbarDismiss id={key} />, []);

  return (
    <AppContext.Provider
      value={{
        closeDrawer: handleCloseDrawer,
        isAdmin,
        openDrawer: handleOpenDrawer,
        setIsAdmin
      }}
    >
      <ThemeProvider theme={theme}>
        <SnackbarProvider action={dismissAction}>
          <Fragment>
            <CssBaseline />
            <BrowserRouter>
              <SwipeableDrawer
                classes={{ paper: classes.drawer }}
                onClose={handleCloseDrawer}
                onOpen={handleOpenDrawer}
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
                  <Route
                    exact
                    path="/login"
                  >
                    <Suspense fallback={<LinearProgress />}>
                      <Login />
                    </Suspense>
                  </Route>
                </Switch>
              </ErrorBoundary>
            </BrowserRouter>
          </Fragment>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.error(err); // eslint-disable-line no-console
    });
  });
}
