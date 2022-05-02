import React, { Fragment, Suspense, lazy } from 'react';
import AppBar from '../AppBar';
import { LinearProgress } from '@mui/material';
import Table from './Table';
import { useAppContext } from '../../hooks/use-app-context';

const Edit = lazy(() => import(/* webpackChunkName: "event-edit" */'./Edit'));

const Event = () => {
  const { isAdmin } = useAppContext();

  return (
    <Fragment>
      <AppBar />
      <Suspense fallback={<LinearProgress />}>
        {isAdmin ? <Edit /> : <Table /> }
      </Suspense>
    </Fragment>
  );
};

export default Event;
