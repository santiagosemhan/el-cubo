import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { SWRConfig } from 'swr';
import fetcher from '../libs/fetcher';

function MyApp({ Component, pageProps }) {
  console.log({ pageProps });
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
