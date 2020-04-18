import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useContext } from 'react';
import AppContext from '../../app-context';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import axios from 'axios';
import { site } from '../../constant';

const LogoutButton = () => {
  const { setDrawerOpen, setIsAdmin } = useContext(AppContext);

  const handleClick = async () => {
    try {
      await axios.get(`${site.url}/admin/logout`);
      setDrawerOpen(false);
      setIsAdmin(false);
    } catch (err) {
      console.error(err);
    }
  };

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
