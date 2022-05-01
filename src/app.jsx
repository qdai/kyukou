import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, LinearProgress, ThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { Fragment, Suspense, lazy, useCallback, useMemo, useState } from 'react';
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
import SwipeableDrawer from './components/SwipeableDrawer';
import axios from 'axios';
import { site } from './constant';
import theme from './theme';
import { useEffectOnce } from 'usehooks-ts';

const Add = lazy(() => import(/* webpackChunkName: "add" */'./components/Add'));
// eslint-disable-next-line import/max-dependencies
const Login = lazy(() => import(/* webpackChunkName: "login" */'./components/Login'));

const queryClient = new QueryClient();

const App = () => {
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

  const appContext = useMemo(() => ({
    closeDrawer: handleCloseDrawer,
    isAdmin,
    openDrawer: handleOpenDrawer,
    setIsAdmin
  }), [
    handleCloseDrawer,
    handleOpenDrawer,
    isAdmin,
    setIsAdmin
  ]);

  return (
    <AppContext.Provider
      value={appContext}
    >
      <ThemeProvider theme={theme}>
        <SnackbarProvider action={dismissAction}>
          <QueryClientProvider client={queryClient}>
            <Fragment>
              <CssBaseline />
              <BrowserRouter>
                <SwipeableDrawer
                  onClose={handleCloseDrawer}
                  onOpen={handleOpenDrawer}
                  open={drawerOpen}
                >
                  <DrawerContent />
                </SwipeableDrawer>
                <ErrorBoundary>
                  <Routes>
                    <Route
                      element={<Events />}
                      path="/"
                    />
                    <Route
                      element={<Settings />}
                      path="/settings"
                    />
                    <Route
                      element={<Status />}
                      path="/status"
                    />
                    <Route
                      element={(
                        <Suspense fallback={<LinearProgress />}>
                          <Add />
                        </Suspense>
                      )}
                      path="/events"
                    />
                    <Route
                      element={<Event />}
                      path="/events/:hash"
                    />
                    <Route
                      element={(
                        <Suspense fallback={<LinearProgress />}>
                          <Login />
                        </Suspense>
                      )}
                      path="/login"
                    />
                  </Routes>
                </ErrorBoundary>
              </BrowserRouter>
            </Fragment>
          </QueryClientProvider>
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
