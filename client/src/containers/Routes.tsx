import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Submit from './Submit';

export default () => (
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit-links" element={<Submit />} />
  </Routes>
);
