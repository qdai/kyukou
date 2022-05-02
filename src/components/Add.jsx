import { Fragment, useCallback } from 'react';
import AppBar from './AppBar';
import { Button } from '@mui/material';
import Container from './Container';
import EventsController from './EventsController';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { site } from '../constant';
import { useAppContext } from '../hooks/use-app-context';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/max-dependencies
import { useSnackbar } from 'notistack';

const Add = () => {
  const { isAdmin } = useAppContext();
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
