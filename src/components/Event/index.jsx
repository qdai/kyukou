import React, { Fragment, Suspense, lazy, useContext } from 'react';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import { LinearProgress } from '@mui/material';
import Table from './Table';

const Edit = lazy(() => import(/* webpackChunkName: "event-edit" */'./Edit'));

const Event = () => {
  const { isAdmin } = useContext(AppContext);

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
