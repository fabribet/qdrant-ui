import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <div>
      {"This route doesn't exist. "}
      <Link to="/">Go to the main page</Link>
    </div>
  );
}
