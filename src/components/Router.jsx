import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Drawer } from './Drawer';
import ErrorBoundary from './ErrorBoundary';
import Event from './Event';
import Events from './Events';
import { LinearProgress } from '@mui/material';
import Settings from './Settings';
import Status from './Status';

const Add = lazy(() => import(/* webpackChunkName: "add" */'./Add'));
// eslint-disable-next-line import/max-dependencies
const Login = lazy(() => import(/* webpackChunkName: "login" */'./Login'));

const Router = () => (
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
);

export { Router };

export default Router;
