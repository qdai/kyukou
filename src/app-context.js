import { createContext } from 'react';

const AppContext = createContext({
  admin: false,
  /** @type {function(boolean): void} */
  // eslint-disable-next-line no-empty-function
  setDrawerOpen: () => {}
});

export default AppContext;
