import { Link, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import React from 'react';

const LogoutButton = () => (
  <ListItem
    button
    component={Link}
    href="/admin/logout"
    underline="none"
  >
    <ListItemIcon>
      <ExitToAppIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
);

export default LogoutButton;
