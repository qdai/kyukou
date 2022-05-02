import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Container from '../Container';
import EventsController from '../EventsController';
import axios from 'axios';
import flatten from 'flat';
import { site } from '../../constant';
import { useCallback } from 'react';
import useEvents from '../../hooks/use-events';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'; // eslint-disable-line import/max-dependencies

const Edit = () => {
  const { hash } = useParams();
  const { events } = useEvents();
  const { control, formState, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const event = events.find(e => e.hash === hash);

  const handleDeleteClick = useCallback(async () => {
    try {
      const { data } = await axios.delete(`${site.url}/admin/events/${hash}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      enqueueSnackbar(`Success: ${data.success.message}`, { variant: 'success' });
      navigate('/');
    } catch (err) {
      enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' });
    }
  }, [
    enqueueSnackbar,
    hash,
    navigate
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
      <form onSubmit={handleSubmit(onEditSubmit)}>
        <Button
          color="primary"
          disabled={formState.isSubmitting}
          sx={{ marginRight: 2 }}
          type="submit"
          variant="contained"
        >
          {'Edit'}
        </Button>
        <Button
          color="secondary"
          onClick={handleDeleteClick}
          variant="contained"
        >
          {'Delete'}
        </Button>
        <EventsController
          control={control}
          defaultValues={event}
        />
      </form>
    </Container>
  );
};

export default Edit;
