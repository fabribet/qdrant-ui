import React from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

/**
 * Used to display a route's title.
 */
export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Typography variant="h6" sx={{ marginBottom: '15px' }}>
      {title}
    </Typography>
  );
}
