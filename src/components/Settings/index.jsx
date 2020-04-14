import React, { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';
import Container from '../Container';
import { LinearProgress } from '@material-ui/core';

const Content = lazy(() => import('./Content'));

const Settings = () => (
  <Fragment>
    <AppBar>
      {'Settings'}
    </AppBar>
    <Suspense fallback={<LinearProgress />}>
      <Container>
        <Content />
      </Container>
    </Suspense>
  </Fragment>
);

export default Settings;