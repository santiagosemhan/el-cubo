import Head from 'next/head';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Container, Logo, Main } from '../styles/Home';
import AppLayout from '../layouts/AppLayout';
import fetch from 'libs/fetcher';

export default function Home({ data }) {
  console.log(data);
  return (
    <AppLayout>
      <Container>
        <Head>
          <title>Proximamente - El cubo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Logo>
            <a href="/">
              <Image
                src="/images/logo.png"
                width="100"
                height="100"
                alt="Proximamente ... El cubo"
                priority
              />
            </a>
          </Logo>
        </Main>
      </Container>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/ott_services/cross_blocks`);

  return {
    props: { data }, // will be passed to the page component as props
  };
};
