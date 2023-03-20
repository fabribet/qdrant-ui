import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMatchView() {
  return (
    <div>
      {"This page doesn't exist. "}
      <Link to="/">
        <Button>Go to the main page</Button>
      </Link>
    </div>
  );
}
