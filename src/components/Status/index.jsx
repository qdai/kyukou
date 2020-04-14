import React, { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';
import { LinearProgress } from '@material-ui/core';

const Content = lazy(() => import('./Content'));

const Status = () => (
  <Fragment>
    <AppBar>
      {'Status'}
    </AppBar>
    <Suspense fallback={<LinearProgress />}>
      <Content />
    </Suspense>
  </Fragment>
);

export default Status;
