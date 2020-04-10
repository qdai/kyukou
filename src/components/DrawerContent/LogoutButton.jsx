import { Button } from '@material-ui/core';
import React from 'react';

const LogoutButton = () => (
  <Button
    href="/admin/logout"
    variant="contained"
  >
    {'Logout'}
  </Button>
);

export default LogoutButton;
