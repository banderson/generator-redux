import React from 'react';
import {Link} from 'react-router';

const Page = () => (
  <div>
    <h1>Other page</h1>
    <div>Example of another page</div>
    <nav><Link to="/">Go back to home screen</Link></nav>
  </div>
);

export default Page;
