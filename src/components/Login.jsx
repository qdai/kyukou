import { Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const { isAdmin, setIsAdmin } = useContext(AppContext);

  if (isAdmin) {
    return <Redirect to="/" />;
  }

  const onSubmit = async values => {
    try {
      await axios.post(`${site.url}/admin/login`, new URLSearchParams(values));
      setIsAdmin(true);
      history.push('/');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        align="center"
        className={classes.header}
        component="h1"
        variant="h5"
      >
        {`${site.name}にログイン`}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={(
            <TextField
              fullWidth
              label="ユーザー名"
              margin="normal"
              required
              type="text"
            />
          )}
          control={control}
          name="username"
        />
        <Controller
          as={(
            <TextField
              fullWidth
              label="パスワード"
              margin="normal"
              required
              type="password"
            />
          )}
          control={control}
          name="password"
        />
        <Button
          className={classes.button}
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

