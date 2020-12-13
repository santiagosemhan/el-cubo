import React, { useRef } from 'react';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { Container } from 'styles/Home';
import AppLayout from 'layouts/AppLayout';
import fetch from 'libs/fetcher';
import MouseCircle from 'components/MouseCircle/MouseCircle';
import useOnMouseOutside from 'libs/hooks/useOnMouseOutside';

export default function SeasonPage({ data }) {
  // if (process.browser) {
  //   console.log({ data });
  // }
  // const { title, field_ec_contents_paragraph_json } = data[0];
  // console.log(JSON.parse(field_ec_contents_page_ref_json));
  const ref = useRef();
  const refHeader = useRef();
  const [bigMouse, setBigMouse] = React.useState(false);
  const [showMouse, setShowMouse] = React.useState(true);

  const handleMouseEnter = () => {
    setBigMouse(true);
    setShowMouse(true);
  };
  useOnMouseOutside(ref, (event) => {
    setShowMouse(false);
  });
  useOnMouseOutside(refHeader, (event) => {
    setBigMouse(true);
  });

  return (
    <AppLayout>
      <Head>
        <title>Temporada 1 - El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container onMouseEnter={handleMouseEnter} ref={ref}>
        <MouseCircle
          href="/el-cubo/temporada-1/1"
          text="Empezar experiencia"
          isBig={bigMouse}
          show={showMouse}
        />

        <div className="header-top" ref={refHeader} onMouseEnter={() => setBigMouse(false)}>
          <div className="header-top-inner">
            <div className="logo-elcubo">
              <a href="/" className="logo--link">
                <img className="logo--image" src="/images/logo-elcubo.png" />
              </a>
            </div>
            {/* <nav className="nav">
              <a href="#" className="nav--link cyan-light">
                Ingreso
              </a>
              <a href="#" className="nav--link cyan-light">
                Registro
              </a>
            </nav> */}
          </div>
        </div>

        <div className="hero hero-3">
          <video className="video-bg" autoPlay muted loop>
            <source src="/videos/2.mp4" type="video/mp4" />
            <source src="/videos/video.webm" type="video/webm" />
          </video>

          <div className="video-overlay">
            <div className="copy-cover-2">
              <h1 className="copy">
                <span className="first cyan-strong">Quién tiene</span>
                <br />
                <span className="second white"> el Poder...</span>
                <br />
                <span className="third cyan-strong">Temporada 1</span>
              </h1>
            </div>

            <div className="paragraph-message">
              <p>
                Explora esta historia escrita y dirigida por
                <strong> Fabio Rubiano</strong> en la que el abuso, la manipulación, la doble vida y
                los secretos de seis personajes cuyos destinos se entrecruzan te llevarán a
                cuestionar tu percepción sobre el
                <strong>PODER</strong>, la honestidad, los valores y la moral.
              </p>
            </div>

            <div className="arrow-down no-link">
              <img src="/images/arrow-down-cyan.svg" />
            </div>
          </div>
        </div>

        <div className="hero hero-4">
          <video className="video-bg" autoPlay muted loop>
            <source src="/videos/1.mp4" type="video/mp4" />
            <source src="/videos/video.webm" type="video/webm" />
          </video>

          <div className="video-overlay">
            <div className="copy-cover-2">
              <h1 className="copy">
                <span className="fourth cyan-strong">
                  poder
                  <sup>1</sup>
                </span>
              </h1>
            </div>

            <div className="paragraph-message">
              <p>
                Del lat. vulg.
                <em>*potēre</em>, creado sobre ciertas formas del verbo lat. posse 'poder1', como
                potes 'puedes',
                <em>potĕram</em> 'podía',
                <em>potuisti</em> 'pudiste', etc.
                <br /> Conjug. modelo. ◆ U. solo en 3.ª pers. en acep. 6.
              </p>

              <ol>
                <li>Tener expedita la facultad o potencia de hacer algo.</li>
                <li>Tener facilidad, tiempo o lugar de hacer algo. U. m. con neg.</li>
                <li>
                  tr. coloq. Tener más fuerza que alguien, vencerlo luchando cuerpo a cuerpo.
                  <strong>
                    <em>Puedo a Roberto</em>
                  </strong>
                  .
                </li>
                <li>
                  Ser más fuerte que alguien, ser capaz de vencerlo.
                  <strong>
                    <em>No pudo CON su rival</em>
                  </strong>
                  .
                </li>
                <li>
                  Aguantar o soportar algo o a alguien que producen rechazo. U. con el verbo en
                  forma negativa.
                  <strong>
                    <em>No puedo CON sus impertinencias</em>
                  </strong>
                  .
                </li>
                <li>
                  intr. Ser contingente o posible que suceda algo.
                  <strong>
                    <em>Puede que llueva mañana</em>
                  </strong>
                  .
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { season: 'temporada-1' } }],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/elcubo/season/4731`);
  return {
    props: { data }, // will be passed to the page component as props
  };
};
