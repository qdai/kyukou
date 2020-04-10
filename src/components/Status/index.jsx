import { Container, LinearProgress } from '@material-ui/core';
import React, { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';

const Content = lazy(() => import('./Content'));

const Status = () => (
  <Fragment>
    <AppBar>
      {'Status'}
    </AppBar>
    <Container>
      <Suspense fallback={<LinearProgress />}>
        <Content />
      </Suspense>
    </Container>
  </Fragment>
);

export default Status;
