import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarType } from '../../utils/constants';

interface CustomSnackbarMsgProps {
  message?: string;
  type?: SnackbarType;
  onClose: () => void;
  duration?: number;
}

/**
 * Notification to give feedback to the user about successful actions or errors.
 * See https://mui.com/material-ui/react-snackbar/
 */
export default function CustomSnackbarMsg({
  message,
  onClose,
  type = SnackbarType.SUCCESS,
  duration = 3000,
}: CustomSnackbarMsgProps) {
  return (
    <Snackbar open={!!message} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
