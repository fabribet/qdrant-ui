import React from 'react';
import CollectionsAPI from '../../api';
import logo from '../../svgs/logo.svg';

const collectionsAPI = new CollectionsAPI();

export default function Home() {
  return (
    <div>
      <img src={logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button onClick={() => collectionsAPI.getCollections()}>Test API</button>
    </div>
  );
}
