import React, { Fragment, Suspense, lazy, useContext } from 'react';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import { LinearProgress } from '@material-ui/core';
import Table from './Table';

const Edit = lazy(() => import('./Edit'));

const Event = () => {
  const { admin } = useContext(AppContext);

  return (
    <Fragment>
      <AppBar />
      <Suspense fallback={<LinearProgress />}>
        {admin ? <Edit /> : <Table /> }
      </Suspense>
    </Fragment>
  );
};

export default Event;
