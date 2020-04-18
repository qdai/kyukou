import { createContext } from 'react';

const AppContext = createContext({
  isAdmin: false,
  /** @type {function(boolean): void} */
  // eslint-disable-next-line no-empty-function
  setDrawerOpen: () => {},
  /** @type {function(boolean): void} */
  // eslint-disable-next-line no-empty-function
  setIsAdmin: () => {}
});

export default AppContext;
