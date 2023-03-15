import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

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
