import React from 'react';
import { GlobalStyles } from '../styles/globals';

const AppLayout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
