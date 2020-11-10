import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { Container, Logo, Main } from '../styles/Home';

export default function Home() {
  return (
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
  );
}
