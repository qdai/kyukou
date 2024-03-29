import { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';
import Container from '../Container';
import { LinearProgress } from '@mui/material';

const Content = lazy(() => import(/* webpackChunkName: "settings-content" */'./Content'));

const Settings = () => (
  <Fragment>
    <AppBar>
      {'設定'}
    </AppBar>
    <Suspense fallback={<LinearProgress />}>
      <Container>
        <Content />
      </Container>
    </Suspense>
  </Fragment>
);

export default Settings;
