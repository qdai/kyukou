import { Container, LinearProgress } from '@material-ui/core';
import React, { Fragment, Suspense, lazy, useContext } from 'react';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import Table from './Table';

const Edit = lazy(() => import('./Edit'));

const Event = () => {
  const { admin } = useContext(AppContext);

  return (
    <Fragment>
      <AppBar />
      <Container>
        {admin
          ? (
            <Suspense fallback={<LinearProgress />}>
              <Edit />
            </Suspense>
          )
          : <Table />}
      </Container>
    </Fragment>
  );
};

export default Event;
