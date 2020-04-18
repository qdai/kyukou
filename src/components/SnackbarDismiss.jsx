import { Close as CloseIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSnackbar } from 'notistack';

const SnackbarDismiss = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      aria-label="閉じる"
      color="inherit"
      onClick={() => closeSnackbar(id)}
      size="small"
    >
      <CloseIcon />
    </IconButton>
  );
};

SnackbarDismiss.propTypes = { id: (PropTypes.string || PropTypes.number).isRequired };

export default SnackbarDismiss;
