import React, { useRef } from 'react';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { Container } from 'styles/Home';
import AppLayout from 'layouts/AppLayout';
import fetch from 'libs/fetcher';

import useOnMouseOutside from 'libs/hooks/useOnMouseOutside';
import HeaderTop from 'components/HeaderTop/HeaderTop';
import { ElcuboGlobalStyles } from 'styles/elcubo.style';
import dynamic from 'next/dynamic';
const MouseCircle = dynamic(() => import('components/MouseCircle/MouseCircle'), { ssr: false });

export default function SeasonPage({ data }) {
  // if (process.browser) {
  //   console.log({ data });
  // }
  // const { title, field_ec_contents_paragraph_json } = data[0];
  // console.log(JSON.parse(field_ec_contents_page_ref_json));
  const ref = useRef();
  const refHeader = useRef();
  const refPlayer = useRef();
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

  useOnMouseOutside(refPlayer, (event) => {
    setBigMouse(true);
  });

  const { title, field_ec_contents, field_ec_contents_paragraph } = data;

  React.useEffect(() => {
    window.onload = function (event) {

      setTimeout(() => {
        document.getElementsByClassName('cover-reveal-row-1')[0].classList.add('active');
        document.getElementsByClassName('cover-reveal-row-1')[1].classList.add('active');
        document.getElementsByClassName('cover-reveal-row-1')[2].classList.add('active');
      }, 1000);
    };

    /* Sound * /
    
    /* Track play */
    track.loop = true;

    let controlBtn = document.getElementById('play-pause');

    function playPause() {
      document.getElementsByClassName('Sound')[0].classList.toggle('off');
      document.getElementsByClassName('play-text')[0].classList.toggle('hide');
      document.getElementsByClassName('play-text')[1].classList.toggle('hide');

      if (track.paused) {
        track.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
      } else {
        track.pause();
        //controlBtn.textContent = "Play";
        controlBtn.className = "play";
      }
    }

    controlBtn.addEventListener("click", playPause);
    track.addEventListener("ended", function () {
      controlBtn.className = "play";
    });

    function getRelationScroll(pObject) {
      let relation = pObject.getBoundingClientRect().top / (main.clientHeight / 2) * 100;
      return relation;
    }

    // Scroll for Hero-0
    const scrollEvent = () => {
      document.getElementsByClassName('cover-reveal-row-2')[0].classList.add('active');
      document.getElementsByClassName('paragraph-message-1')[0].classList.add('active-fadein');
      document.getElementsByClassName('paragraph-message-2')[0].classList.add('active-fadein');
    }
    document.addEventListener('scroll', scrollEvent);


    // Pane Login
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelectorAll('.close');
    const pane = document.querySelector('.pane-login');


    if (button_open) {
        button_open.forEach((link) => {
            link.addEventListener('click', () => {
              console.log('lallala');
                fadeIn(pane, 40);
            });
        });
    }

    if (button_close) {
      button_close.forEach((link) => {
          link.addEventListener('click', () => {
              fadeOut(pane, 40);
          });
      });
    }


    const fadeOut = (el, pTime) => {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .07) < 0) {
                el.style.display = "none";
            } else {
                setTimeout(fade, pTime);
            }
        })();
    };

    const fadeIn = (el, pTime) => {
        el.style.opacity = 0;
        el.style.display = "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .07) > 1)) {
                el.style.opacity = val;
                setTimeout(fade, pTime);
            } else {
                el.style.opacity = 1;
            }
        })();
    };
  
  }, []);


  return (
    <AppLayout>
      <ElcuboGlobalStyles />

      <Head>
        <title>{title} - El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pane-login is-hidden">
        <div className="pane-cover"></div>

        <div className="pane open">
          <a className="icon close">
            <img src="/images/pane-close.svg" />
          </a>
          <div className="pane-content">
              Para enriquecer tu experiencia en EL CUBO y obtener recompensas puedes registrarte en
  
            <img className="logo-login-rtvc" src="/images/logo-RTVCPlay-Header.png" />
          
            <div className="col-2">
            <a className="button-login cyan-dark button-register close" href="#">Registrarme</a>
            
            <a className="button-login cyan-dark button-quit close" href="#">En otro momento</a>
            </div>
          </div>

        </div>
      </div>

      <Container onMouseEnter={handleMouseEnter} ref={ref}>
        <MouseCircle
          href="temporada-1/personajes"
          text="Empezar"
          isBig={bigMouse}
          show={showMouse}
          className="circle-temp toggle"
        />

        {/* <div className="header-top" ref={refHeader} onMouseEnter={() => setBigMouse(false)}>
          <div className="header-top-inner">
            <div className="logo-elcubo">
              <a href="/" className="logo--link">
                <img className="logo--image" src="/images/logo-elcubo.png" />
              </a>
            </div>
          </div>
        </div> */}





        <div className="logo-season" ref={refHeader} onMouseEnter={() => setBigMouse(false)}>
          <HeaderTop />

          <div id="nav-login">
            <span className="user-logged">Bienvenid@, Josi</span>
            <a href="#" className="link-login">Ingresar</a>
            <a href="#" className="link-logout">Salir</a>
          </div>

          <div>
            <audio id="track" loop="">
              <source src="/audios/loop-1.mp3" type="audio/mpeg" />
            </audio>
            <div id="audio-player-container" className="audio-season">
              <div id="play-pause" className="play no-link">
                <div className="column-1">
                  <span className="mute hide play-text">silenciar</span>
                  <span className="listen play-text">escuchar</span>
                </div>
                <div className="column-2">
                  <div className="Sound off">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

       

        <div className="scrolldown">
          <div className="line"></div>
        </div>


        <div id="hero-3" className="hero hero-3">

          <img className="img-bg-deg" src="/images/bg-deg.png" />

          <video className="video-bg hide" autoPlay muted>
            <source src="https://rtvcplay-v2.s3.amazonaws.com/s3fs-public/field/ec-video/desk/Video%20IN%204A.mp4" type="video/mp4" />
          </video>
          <img className="img-bg-pc" src="https://rtvcplay-v2.s3.amazonaws.com/s3fs-public/field/ec-image/SITILLVideo%20IN%204_0.jpg" />
          <img className="img-bg-mobile" src="https://rtvcplay-v2.s3.amazonaws.com/s3fs-public/field/ec-image/mobil/SITILLVideo%20IN%204_0.jpeg" />
          <div className="video-overlay">
            <div className="copy-cover-2 cover-first">
              <div className="copy">

                <div className="cover-scroll">

                  <h1 className="cover-reveal-row cover-reveal-row-1">
                    <span className="third cyan-strong">Temporada 1</span>
                  </h1>
                  <h1 className="cover-reveal-row cover-reveal-row-1">
                    <span className="first cyan-strong first">Quién tiene</span>
                  </h1>
                  <h1 className="cover-reveal-row cover-reveal-row-1">
                    <span className="second white second">el poder...</span>
                  </h1>


                </div>

              </div>

              <p className="p-button">
                <a className="button-mobile" href="/el-cubo/temporada-1/personajes">Empieza tu experiencia </a>
              </p>


              <div className="cover-scroll">

                <h1 className="cover-reveal-row cover-reveal-row-2" >
                  <span className="first fourth cyan-strong">poder
                            <sup>1</sup>
                  </span>
                </h1>


              </div>



              <div className="paragraph-message paragraph-message-1">
                <a href="https://elcubo.vercel.app/el-cubo/temporada-1/personajes">
                  <p>Del lat. vulg.
                            <em>*potēre</em>, creado sobre ciertas formas del verbo lat. posse 'poder1', como potes 'puedes',
                            <em>potĕram</em> 'podía',
                            <em>potuisti</em> 'pudiste', etc.
                            <br /> Conjug. modelo. ◆ U. solo en 3.ª pers. en acep. 6.</p>

                  <ol>
                    <li>Tener expedita la facultad o potencia de hacer algo.</li>
                    <li>Tener facilidad, tiempo o lugar de hacer algo. U. m. con neg.</li>
                    <li>tr. coloq. Tener más fuerza que alguien, vencerlo luchando cuerpo a cuerpo.
                                <strong>
                        <em>Puedo a Roberto</em>
                      </strong>.</li>
                    <li>Ser más fuerte que alguien, ser capaz de vencerlo.
                                <strong>
                        <em>No pudo CON su rival</em>
                      </strong>.</li>
                    <li>Aguantar o soportar algo o a alguien que producen rechazo. U. con el verbo en forma negativa.
                                <strong>
                        <em>No puedo CON sus impertinencias</em>
                      </strong>.</li>
                    <li>intr. Ser contingente o posible que suceda algo.
                                <strong>
                        <em>Puede que llueva mañana</em>
                      </strong>.</li>
                  </ol>
                </a>
              </div>


              <div className="paragraph-message paragraph-message-2">
                <a href="https://elcubo.vercel.app/el-cubo/temporada-1/personajes">
                  <p>Explora esta historia escrita y dirigida por <strong>Fabio Rubiano</strong> en la que el abuso, la manipulación, la doble vida y los secretos de seis
personajes cuyos destinos se entrecruzan te llevarán a cuestionar tu percepción sobre el <strong> PODER</strong>, la honestidad, los valores y la moral.</p>
                </a>
              </div>

              <p className="p-button">
                <a className="button-mobile" href="/el-cubo/temporada-1/personajes">Empieza tu experiencia </a>
              </p>


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
  const data = await fetch(`/api/v1/el-cubo/page/5365`);

  if (!data.length) {
    return { props: { data: {} } };
  }

  const { field_ec_contents, field_ec_contents_paragraph_json, title } = data[0];

  return {
    props: {
      data: {
        title,
        field_ec_contents: field_ec_contents.split(',').map((c) => c.trim()),
        field_ec_contents_paragraph: JSON.parse(field_ec_contents_paragraph_json),
      },
    },
  };
};
