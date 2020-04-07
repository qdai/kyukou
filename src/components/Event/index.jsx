import React, { Fragment, useContext } from 'react';
import AppBar from '../AppBar';
import AppContext from '../../app-context';
import { Container } from '@material-ui/core';
import Edit from './Edit';
import Table from './Table';

const Event = () => {
  const { admin } = useContext(AppContext);

  return (
    <Fragment>
      <AppBar />
      <Container>
        {admin ? <Edit /> : <Table />}
      </Container>
    </Fragment>
  );
};

export default Event;
