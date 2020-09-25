import { createContext } from 'react';

const AppContext = createContext({
  /** @type {function(): void} */
  // eslint-disable-next-line no-empty-function
  closeDrawer: () => {},
  /** @type {boolean} */
  isAdmin: false,
  /** @type {function(): void} */
  // eslint-disable-next-line no-empty-function
  openDrawer: () => {},
  /** @type {function(boolean): void} */
  // eslint-disable-next-line no-empty-function
  setIsAdmin: () => {}
});

export default AppContext;
