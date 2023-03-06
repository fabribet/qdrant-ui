import React from 'react';
import { AppBar } from '@mui/material/';

export default function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <AppBar position="static" color="primary" />
      {children}
    </div>
  );
}
