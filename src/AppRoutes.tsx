import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import MainContainer from './components/MainContainer';
import NoMatch from './views/NoMatch';
import CollectionsView from './views/Collections';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<CollectionsView />} />

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
