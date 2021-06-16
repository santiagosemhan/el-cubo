import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { SWRConfig } from 'swr';
import fetcher from '../libs/fetcher';

import React from 'react';
import { useRouter } from 'next/router'

import * as ga from '../libs/ga'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />
        {/* <meta
          name="google-site-verification"
          content="mhLRD3-FhRQPbyc0ddPB_tAnXScAU0WWxybNe27CYXM"
        /> */}

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:site_name" content="El Cubo." />

      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
