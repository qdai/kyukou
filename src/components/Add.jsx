import React, { Fragment, useCallback, useContext } from 'react';
import AppBar from './AppBar';
import AppContext from '../app-context';
import { Button } from '@mui/material';
import Container from './Container';
import EventsController from './EventsController';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { site } from '../constant';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'; // eslint-disable-line import/max-dependencies

const Add = () => {
  const { isAdmin } = useContext(AppContext);
  const { control, formState, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(async params => {
    try {
      const { data } = await axios.post(`${site.url}/admin/events`, params, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      enqueueSnackbar(`Success: ${data.success.message}`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  if (!isAdmin) {
    return (
      <Navigate
        replace
        to="/"
      />
    );
  }

  return (
    <Fragment>
      <AppBar>
        {'Add new event'}
      </AppBar>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            color="primary"
            disabled={formState.isSubmitting}
            type="submit"
            variant="contained"
          >
            {'Add'}
          </Button>
          <EventsController control={control} />
        </form>
      </Container>
    </Fragment>
  );
};

export default Add;
