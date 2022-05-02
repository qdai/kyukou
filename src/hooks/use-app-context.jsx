import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { site } from '../constant';
import { useEffectOnce } from 'usehooks-ts';

const defaultAppContext = {
  /** @type {function(): void} */
  closeDrawer: () => undefined,
  /** @type {boolean} */
  drawerOpen: false,
  /** @type {boolean} */
  isAdmin: false,
  /** @type {function(): void} */
  openDrawer: () => undefined,
  /** @type {function(boolean): void} */
  setIsAdmin: () => undefined
};

const Context = createContext(defaultAppContext);

const useAppContext = () => useContext(Context);

const Provider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(defaultAppContext.drawerOpen);
  const [isAdmin, setIsAdmin] = useState(defaultAppContext.isAdmin);

  const closeDrawer = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);
  const openDrawer = useCallback(() => setDrawerOpen(true), [setDrawerOpen]);

  useEffectOnce(() => {
    const checkIsAdmin = async () => {
      const { data } = await axios.get(`${site.url}/admin`);
      setIsAdmin(data.isAdmin === true);
    };
    checkIsAdmin();
  });

  const context = useMemo(() => ({
    closeDrawer,
    drawerOpen,
    isAdmin,
    openDrawer,
    setIsAdmin
  }), [
    closeDrawer,
    drawerOpen,
    isAdmin,
    openDrawer,
    setIsAdmin
  ]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = { children: PropTypes.node };

Provider.defaultProps = { children: null };

export { Context, Provider, useAppContext };

export default useAppContext;
