import React from 'react';
import { GlobalStyles } from '../styles/globals';
// import useSWR, { mutate } from 'swr';

const AppLayout = ({ children }) => {
  // const { data } = useSWR('/ping');
  // mutate('/api/user', { hola: 'mundo' }, false);
  // console.log(data);
  return (
    <>
      <GlobalStyles />
      {/* {data?.date} */}
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
