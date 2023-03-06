import React from 'react';
import './App.css';
import './api';
import { Route, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Home from './components/Home';
import NoMatch from './views/NoMatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route index element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
