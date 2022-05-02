import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { Fragment, useCallback } from 'react';
import { Provider as AppContextProvider } from './hooks/use-app-context';
import { CacheProvider } from '@emotion/react';
import ReactDOM from 'react-dom';
import { Router } from './components/Router';
import SnackbarDismiss from './components/SnackbarDismiss';
import { SnackbarProvider } from 'notistack';
import createCache from '@emotion/cache';
// eslint-disable-next-line import/max-dependencies
import theme from './theme';

const emotionCache = createCache({
  key: 'css',
  nonce: document.querySelector('meta[property="csp-nonce"]')?.getAttribute('content') ?? undefined
});

const queryClient = new QueryClient();

const App = () => {
  const dismissAction = useCallback(key => <SnackbarDismiss id={key} />, []);

  return (
    <AppContextProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider action={dismissAction}>
            <QueryClientProvider client={queryClient}>
              <Fragment>
                <CssBaseline />
                <Router />
              </Fragment>
            </QueryClientProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </AppContextProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.error(err); // eslint-disable-line no-console
    });
  });
}
