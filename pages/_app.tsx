import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { SWRConfig } from 'swr';
import fetcher from '../libs/fetcher';

function MyApp({ Component, pageProps }) {

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

        <meta property="og:site_name" content="El Cubo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="El Cubo" />
        <meta property="og:description" content="Historias Tridimensionales" />
        <meta property="og:url" content="https://elcubo.rtvcplay.co/" />
        <meta property="og:site_name" content="El Cubo" />
        <meta property="og:image" content="/images/social.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="El Cubo" />
        <meta name="twitter:description" content="Historias Tridimensionales" />
        <meta name="twitter:image" content="/images/social.jpg" />

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
