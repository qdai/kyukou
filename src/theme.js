import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#720130',
      light: '#aa4e78',
      main: '#85023e'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#011f70',
      light: '#4e69a8',
      main: '#022983'
    }
  },
  typography: {
    body1: { textAlign: 'justify' },
    body2: { textAlign: 'justify' },
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'Hiragino Sans',
      'Meiryo',
      'sans-serif'
    ].join(',')
  }
});

export default theme;
