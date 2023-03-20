import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import { MainWrapper, ContentContainer } from './styledComponents';

/**
 * Main wrapper of the app. Contains the sidebar to navigate and the content of the active page.
 */
export default function MainContainer() {
  return (
    <MainWrapper>
      <Sidebar />
      <ContentContainer component="main">
        {/* Outlet will be used to render the component passed to the Route */}
        <Outlet />
      </ContentContainer>
    </MainWrapper>
  );
}
