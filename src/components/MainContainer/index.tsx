import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import { MainWrapper, ContentContainer } from './styledComponents';

export default function MainContainer() {
  return (
    <MainWrapper>
      <Sidebar />
      <ContentContainer component="main">
        <Outlet />
      </ContentContainer>
    </MainWrapper>
  );
}
