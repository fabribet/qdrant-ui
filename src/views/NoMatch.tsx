import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <div>
      {"This page doesn't exist. "}
      <Link to="/">Go to the main page</Link>
    </div>
  );
}
