import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, LinearProgress, SwipeableDrawer, ThemeProvider, makeStyles } from '@material-ui/core';
import React, { Fragment, Suspense, lazy, useState } from 'react';
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

const Add = lazy(() => import('./components/Add'));
const Login = lazy(() => import('./components/Login'));

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

  useEffectOnce(() => {
    const checkIsAdmin = async () => {
      const { data } = await axios.get(`${site.url}/admin`);
      setIsAdmin(data.isAdmin === true);
    };
    checkIsAdmin();
  });

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        setDrawerOpen,
        setIsAdmin
      }}
    >
      <ThemeProvider theme={theme}>
        <SnackbarProvider action={key => <SnackbarDismiss id={key} />}>
          <Fragment>
            <CssBaseline />
            <BrowserRouter>
              <SwipeableDrawer
                classes={{ paper: classes.drawer }}
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
