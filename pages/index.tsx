import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Container, Logo, Main } from '../styles/Home';
import AppLayout from '../layouts/AppLayout';
import fetch from 'libs/fetcher';
import MouseCircle from 'components/MouseCircle/MouseCircle';
import useOnMouseOutside from 'libs/hooks/useOnMouseOutside';

export default function Home({ data }) {
  // if (process.browser) {
  //   console.log({ data });
  // }
  // const { title, field_ec_contents_paragraph_json } = data[0];
  // console.log(JSON.parse(field_ec_contents_paragraph_json));
  const ref = useRef();
  const [bigMouse, setBigMouse] = React.useState(false);

  const handleMouseEnter = () => {
    setBigMouse(true);
  };

  useOnMouseOutside(ref, () => setBigMouse(false));

  return (
    <AppLayout>
      <Head>
        <title>El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {/* <div id="mouse-circle" className="is-hidden">
          <span>
            <a href="/el-cubo">Ver más</a>
          </span>
        </div> */}
        <MouseCircle href="/el-cubo/temporada-1" text="Ver más" isBig={bigMouse} />

        <div className="header-top">
          <div className="header-top-inner">
            <div className="logo-elcubo">
              <a href="#" className="logo--link">
                <img className="logo--image" src="images/logo-elcubo.png" />
              </a>
            </div>
            <nav className="nav">
              <a href="#" className="nav--link cyan-light">
                Ingreso
              </a>
              <a href="#" className="nav--link cyan-light">
                Registro
              </a>
            </nav>
          </div>
        </div>

        <div className="hero hero-0 no-link">
          <video className="video-bg" autoPlay muted loop>
            <source src="/videos/2.mp4" type="video/mp4" />
          </video>

          <div className="video-overlay">
            <div className="copy-cover">
              <h1 className="copy">
                <span className="first cyan-strong">¿De qué están hechas</span>
                <br />
                <span className="second white"> las relaciones humanas?</span>
              </h1>

              <h1 className="copy">
                <span className="first cyan-strong">¿Con cuántos hilos</span>
                <br />
                <span className="second white"> se teje una historia? </span>
              </h1>

              <h1 className="copy">
                <span className="first cyan-strong">¿Cuántas verdades pueden contenerse</span>
                <br />
                <span className="second white"> en una misma realidad?</span>
              </h1>

              <h1 id="link-texto" className="copy-final">
                <span className="first cyan-strong">
                  Descúbrelo en El Cubo, una experiencia digital
                </span>
                <br />
                <span className="second white"> en la que serás Arte y Parte.</span>
              </h1>
            </div>

            <div className="arrow-down no-link">
              <img src="images/arrow-down-cyan.svg" />
            </div>
          </div>
        </div>

        <div className="hero hero-1 no-link">
          <video className="video-bg" autoPlay muted loop>
            <source src="/videos/1.mp4" type="video/mp4" />
          </video>

          <div className="video-overlay">
            <div className="paragraph-message">
              <hr />
              <p>
                Navega cualquiera de nuestras historias
                <br /> a partir de varios modos narrativos y comprueba
                <br /> así que la verdad…
              </p>
            </div>

            <div className="copy-cover">
              <h1 className="copy">
                <span className="first white-strong">...La verdad</span>
                <br />
                <span className="second white"> Nunca es una sola</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="hero hero-2" onMouseEnter={handleMouseEnter} ref={ref}>
          <video className="video-bg" autoPlay muted loop>
            <source src="/videos/1.mp4" type="video/mp4" />
          </video>

          <div className="video-overlay">
            <div className="copy-cover">
              <h1 className="copy">
                <span className="first white-strong">Quién Tiene el Poder...</span>
              </h1>
            </div>

            <div className="paragraph-message">
              <p>
                En esta historia creada por Fabio Rubiano
                <br /> exploraremos las distintas caras
                <br /> del concepto poder...
              </p>
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/el-cubo/page/5364`);

  return {
    props: { data }, // will be passed to the page component as props
  };
};
