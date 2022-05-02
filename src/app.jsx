import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { Fragment, Suspense, lazy, useCallback } from 'react';
import { Provider as AppContextProvider } from './hooks/use-app-context';
import { CacheProvider } from '@emotion/react';
import { Drawer } from './components/Drawer';
import ErrorBoundary from './components/ErrorBoundary';
import Event from './components/Event';
import Events from './components/Events';
import ReactDOM from 'react-dom';
import Settings from './components/Settings';
import SnackbarDismiss from './components/SnackbarDismiss';
import { SnackbarProvider } from 'notistack';
import Status from './components/Status';
import createCache from '@emotion/cache';
import theme from './theme';

const emotionCache = createCache({
  key: 'css',
  nonce: document.querySelector('meta[property="csp-nonce"]')?.getAttribute('content') ?? undefined
});

const Add = lazy(() => import(/* webpackChunkName: "add" */'./components/Add'));
// eslint-disable-next-line import/max-dependencies
const Login = lazy(() => import(/* webpackChunkName: "login" */'./components/Login'));

const queryClient = new QueryClient();

const App = () => {
  const dismissAction = useCallback(key => <SnackbarDismiss id={key} />, []);

  return (
    <AppContextProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider action={dismissAction}>
            <QueryClientProvider client={queryClient}>
              <Fragment>
                <CssBaseline />
                <BrowserRouter>
                  <Drawer />
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
      </CacheProvider>
    </AppContextProvider>
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
