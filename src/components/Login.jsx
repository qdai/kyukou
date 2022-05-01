import { Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../app-context';
import axios from 'axios';
import { site } from '../constant';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  button: { margin: theme.spacing(4, 0) },
  header: { padding: theme.spacing(4, 0, 0) }
}));

const Login = () => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useContext(AppContext);

  if (isAdmin) {
    return <Navigate to="/" />;
  }

  const onSubmit = async values => {
    try {
      await axios.post(`${site.url}/admin/login`, new URLSearchParams(values));
      setIsAdmin(true);
      navigate('/');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        align="center"
        classes={{ root: classes.header }}
        component="h1"
        variant="h5"
      >
        {`${site.name}にログイン`}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          defaultValue=""
          name="username"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => (
            <TextField
              fullWidth
              label="ユーザー名"
              margin="normal"
              required
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="password"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => (
            <TextField
              fullWidth
              label="パスワード"
              margin="normal"
              required
              type="password"
              {...field}
            />
          )}
        />
        <Button
          classes={{ root: classes.button }}
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
        >
          {'ログイン'}
        </Button>
      </form>
    </Container>
  );
};

export default Login;

