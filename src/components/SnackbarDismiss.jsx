import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
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
