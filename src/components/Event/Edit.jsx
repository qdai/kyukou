import { Button, Container } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EventsController from '../EventsController';
import axios from 'axios';
import flatten from 'flat';
import { site } from '../../constant';
import useEvents from '../../hooks/use-events';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Edit = () => {
  const { hash } = useParams();
  const { events } = useEvents();
  const { control, formState, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const event = events.find(e => e.hash === hash);

  const handleDeleteClick = useCallback(async () => {
    try {
      const { data } = await axios.delete(`${site.url}/admin/events/${hash}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      enqueueSnackbar(`Success: ${data.success.message}`, { variant: 'success' });
      history.push('/');
    } catch (err) {
      enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' });
    }
  }, [
    enqueueSnackbar,
    hash,
    history
  ]);

  const onEditSubmit = useCallback(async update => {
    // Flatten tweet property and remove empty tweet object
    // eslint-disable-next-line no-unused-vars
    const { tweet, ...flat } = flatten(update);
    try {
      const { data } = await axios.put(`${site.url}/admin/events/${hash}`, flat, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      enqueueSnackbar(`Success: ${data.success.message}`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' });
    }
  }, [enqueueSnackbar, hash]);

  return (
    <Container>
      <Button
        color="secondary"
        onClick={handleDeleteClick}
        variant="contained"
      >
        {'Delete'}
      </Button>
      <form onSubmit={handleSubmit(onEditSubmit)}>
        <EventsController
          control={control}
          defaultValues={event}
        />
        <Button
          color="primary"
          disabled={formState.isSubmitting}
          type="submit"
          variant="contained"
        >
          {'Edit'}
        </Button>
      </form>
    </Container>
  );
};

export default Edit;
