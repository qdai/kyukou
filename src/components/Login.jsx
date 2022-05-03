import { Button, Container, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { site } from '../constant';
import { useAppContext } from '../hooks/use-app-context';
import { useSnackbar } from 'notistack';

const Login = () => {
  const { control, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useAppContext();

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
        component="h1"
        sx={{ paddingTop: 4 }}
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
          color="primary"
          fullWidth
          sx={{ marginY: 4 }}
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

