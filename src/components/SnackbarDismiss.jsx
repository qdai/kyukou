import React, { useCallback } from 'react';
import { Close as CloseIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

const SnackbarDismiss = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  const handleClose = useCallback(() => closeSnackbar(id), [closeSnackbar, id]);

  return (
    <IconButton
      aria-label="閉じる"
      color="inherit"
      onClick={handleClose}
      size="small"
    >
      <CloseIcon />
    </IconButton>
  );
};

SnackbarDismiss.propTypes = { id: (PropTypes.string || PropTypes.number).isRequired };

export default SnackbarDismiss;
