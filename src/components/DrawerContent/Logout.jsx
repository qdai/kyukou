import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import AppContext from '../../app-context';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import axios from 'axios';
import { site } from '../../constant';

const LogoutButton = () => {
  const { closeDrawer, setIsAdmin } = useContext(AppContext);

  const handleClick = useCallback(async () => {
    try {
      await axios.get(`${site.url}/admin/logout`);
      closeDrawer();
      setIsAdmin(false);
    } catch (err) {
      console.error(err);
    }
  }, [closeDrawer, setIsAdmin]);

  return (
    <ListItem
      button
      onClick={handleClick}
    >
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="ログアウト" />
    </ListItem>
  );
};

export default LogoutButton;
