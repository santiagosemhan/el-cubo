import React from 'react';
import Header from 'components/Header/Header';
import { GlobalStyles } from '../styles/globals';
import { RTVCStyles } from '../styles/rtvc';
import Footer from 'components/Footer/Footer';
// import useSWR, { mutate } from 'swr';

const AppLayout = ({ children }) => {
  // const { data } = useSWR('/ping');
  // mutate('/api/user', { hola: 'mundo' }, false);
  // console.log(data);
  return (
    <>
      <RTVCStyles />
      <GlobalStyles />
      {/* {data?.date} */}
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default AppLayout;
