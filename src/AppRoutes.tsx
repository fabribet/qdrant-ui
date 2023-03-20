import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeView from './components/views/Home';
import MainContainer from './components/MainContainer';
import NoMatchView from './components/views/NoMatch';
import CollectionsView from './components/views/Collections';
import AdministrationView from './components/views/Administration';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index element={<HomeView />} />
        <Route path="collections" element={<CollectionsView />} />
        <Route path="administration" element={<AdministrationView />} />

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        <Route path="*" element={<NoMatchView />} />
      </Route>
    </Routes>
  );
}
