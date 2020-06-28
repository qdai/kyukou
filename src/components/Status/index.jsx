import React, { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';
import { LinearProgress } from '@material-ui/core';

const Content = lazy(() => import(/* webpackChunkName: "status-content" */'./Content'));

const Status = () => (
  <Fragment>
    <AppBar>
      {'ステータス'}
    </AppBar>
    <Suspense fallback={<LinearProgress />}>
      <Content />
    </Suspense>
  </Fragment>
);

export default Status;
