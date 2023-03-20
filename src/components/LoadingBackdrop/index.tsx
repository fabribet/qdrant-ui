import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

/**
 * Creates a grayed out transparent backgound and a loading spinner that covers the entire app
 * to display a loading status. ** The user cannot interact with the app in the mean time **.
 * See https://mui.com/material-ui/react-backdrop/
 */
export default function LoadingBackdrop({
  loading = false,
}: {
  loading?: boolean;
}) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
