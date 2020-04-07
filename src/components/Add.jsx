import { Button, Container } from '@material-ui/core';
import React, { Fragment, useCallback, useContext } from 'react';
import AppBar from './AppBar';
import AppContext from '../app-context';
import EventsController from './EventsController';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { site } from '../constant';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Add = () => {
  const { admin } = useContext(AppContext);
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

  if (!admin) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <AppBar>
        {'Add new event'}
      </AppBar>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EventsController control={control} />
          <Button
            color="primary"
            disabled={formState.isSubmitting}
            type="submit"
            variant="contained"
          >
            {'Add'}
          </Button>
        </form>
      </Container>

    </Fragment>
  );
};

export default Add;
