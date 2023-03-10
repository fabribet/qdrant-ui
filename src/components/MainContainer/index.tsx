import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

import './styles.scss';
import Sidebar from '../Sidebar';

export default function MainContainer() {
  return (
    <div className="container">
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}
