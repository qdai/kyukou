import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useCallback } from 'react';
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import axios from 'axios';
import { site } from '../../constant';
import { useAppContext } from '../../hooks/use-app-context';

const LogoutButton = () => {
  const { closeDrawer, setIsAdmin } = useAppContext();

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
