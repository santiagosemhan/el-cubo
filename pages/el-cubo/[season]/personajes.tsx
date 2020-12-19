import HeaderTop from 'components/HeaderTop/HeaderTop';
import AppLayout from 'layouts/AppLayout';
import fetcher from 'libs/fetcher';
import { GetStaticProps } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { HelpGlobalStyle } from 'styles/help.style';
import { Container } from 'styles/Home';
import { PersonajesGlobalStyle } from 'styles/personajes.style';

const CharactersPage = ({ data = {} }) => {
  console.log({ data });
  const { isFallback } = useRouter();

  if (!isFallback && !data) {
    return <Error statusCode={404} title="Page could not be found" />;
  }

  const { chronology, field_ec_characters, field_ec_characters_terms_json } = data;

  const [videoLink, setVideoLink] = React.useState('/');

  React.useEffect(() => {
    // Pane Slide
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelectorAll('.close');
    const pane = document.querySelector('.pane');
    const pane_cover = document.querySelector('.pane-cover');
    const fake_cover = document.querySelector('.fake-cover');


    window.onload = function () {
      disableScroll();
    };


    if (button_open) {
      button_open.forEach(function (link) {
        link.addEventListener('click', () => {
          pane.classList.add('open');
          disableScroll();
          pane_cover.classList.toggle('visible');
          document.getElementById('video1').src = link.dataset.video;
          document.getElementById('select-personaje').dataset.personaje = link.dataset.personaje;
          document.getElementById('name-personaje').innerHTML = link.dataset.nombre;
          document.getElementById('desc-personaje').innerHTML = link.dataset.desc;
          myVideo.play();
        });
      });
    }

    if (button_close) {
      button_close.forEach(function (link) {
        link.addEventListener('click', () => {
          pane.classList.toggle('open');
          enableScroll();
          pane_cover.classList.toggle('visible');
          myVideo.pause();
          myVideo.currentTime = 0;
        });
      });
    }

    const button_select = document.getElementById('select-personaje');
    let character = 'unselect';

    if (button_select) {
      button_select.addEventListener('click', () => {
        character = button_select.dataset.personaje;

        pane.classList.toggle('open');
        enableScroll();

        pane_cover.classList.toggle('visible');
        myVideo.pause();
        myVideo.currentTime = 0;

        fake_cover.classList.toggle('visible');

        var personaje_child = document.querySelectorAll('.child');
        [].forEach.call(personaje_child, function (el) {
          el.classList.remove('is-selected');
        });

        document
          .getElementsByClassName(button_select.dataset.personaje)[0]
          .classList.add('is-selected');

        var selector = document.querySelectorAll('.selector-mode');
        [].forEach.call(selector, function (el) {
          el.classList.remove('is-hidden');
        });

        const chrono = chronology.find((cr) => cr.field_ec_character === character);
        const episodes = chrono.field_ec_episodes.split(',').map((ep) => ep.trim());
        console.log(episodes[0]);
        console.log(character);
        setVideoLink(`/el-cubo/temporada-1/${episodes[0]}?personaje=${character}&modo=cronologico`);
      });
    }

    let myVideo = document.getElementById('video1');
    if (myVideo) {
      function playPause() {
        if (myVideo.paused) myVideo.play();
        else myVideo.pause();
      }
    }

    // Disabled fake cover 
    fake_cover.addEventListener('mousemove', () => {
      fake_cover.classList.remove('visible');
    });

    // Modal Help
    const openModalTriggerEl = document.querySelector('.open-modal');
    const closeModalTriggerEl = document.querySelector('.close-modal');
    const modalEl = document.querySelector('.modal');

    function modal() {
      if (openModalTriggerEl) {
        openModalTriggerEl.addEventListener('click', () => {
          modalEl.classList.add('open');
          disableScroll();
          openModalTriggerEl.classList.toggle('is-active');
        });
      }
      if (closeModalTriggerEl) {
        closeModalTriggerEl.addEventListener('click', () => {
          goToStep(1);
          enableScroll();
          openModalTriggerEl.classList.toggle('is-active');
          fake_cover.classList.toggle('visible');
          modalEl.classList.remove('open');
        });
      }
      window.addEventListener('click', () => {
        if (event.target === modalEl) {
          goToStep(1);
          enableScroll();
          openModalTriggerEl.classList.toggle('is-active');
          modalEl.classList.remove('open');
        }
      })

      function keyPress(e) {
        if (e.key === "Escape") {
          modalEl.classList.remove('open');
        }
      }
    }

    modal();



    /* Wizard Help */
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById('validate');
    const dots = document.getElementsByClassName('progress-bar__dot');
    const numberOfSteps = 3;
    let currentStep = 1;

    for (let i = 0; i < dots.length; ++i) {
      dots[i].addEventListener('click', () => {
        goToStep(i + 1)
      })
    }

    previousButton.onclick = goPrevious;
    nextButton.onclick = goNext;

    function goNext(e) {
      e.preventDefault();
      currentStep += 1;
      goToStep(currentStep);
    }

    function goPrevious(e) {
      e.preventDefault();
      currentStep -= 1;
      goToStep(currentStep);
    }

    function goToStep(stepNumber) {
      currentStep = stepNumber;

      let inputsToHide = document.getElementsByClassName('step');
      let inputs = document.getElementsByClassName(`step${currentStep}`);

      //hide all input
      for (let i = 0; i < inputsToHide.length; ++i) {
        hide(inputsToHide[i]);
      }

      //only show the right one
      for (let i = 0; i < inputs.length; ++i) {
        show(inputs[i])
      }

      //if we reached final step
      if (currentStep === numberOfSteps) {
        enable(previousButton);
        show(submitButton);
      }

      //else if first step
      else if (currentStep === 1) {
        hide(submitButton);
      } else {
        enable(previousButton);
        enable(next);
        hide(submitButton);
      }
    }

    function enable(elem) {
      if (elem) {
        elem.disabled = false;
      }
    }

    function disable(elem) {
      if (elem) {
        elem.classList.add("disabled");
        elem.disabled = true;
      }
    }

    function show(elem) {
      if (elem) {
        elem.classList.remove('hidden');

        let str = elem.className;
        let res = str.charAt(str.length - 1)
        modalEl.className = 'modal open step-' + res;
      }
    }

    function hide(elem) {
      if (elem) {
        elem.classList.add('hidden');
      }
    }


    // Enable Disable Scroll

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
      }));
    } catch (e) { }

    let wheelOpt = supportsPassive ? { passive: false } : false;
    let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }

  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Personajes - El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PersonajesGlobalStyle />
      <HelpGlobalStyle />
      <Container>
        {isFallback ? (
          <div>Loading...</div>
        ) : (
            <>
              <div className="help-wrapper">
                <HeaderTop
                  nav={
                    <nav className="nav">
                      <ul>
                        <li>
                          <a href="#" className="toggle-help open-modal is-active">
                            <span>Ayuda</span>
                            <div className="icon-help">
                              <img className="icon-help-open" src="/images/icon-help-open.svg" />
                              <img className="icon-help-close" src="/images/icon-help-close.svg" />
                            </div>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  }
                />

                <div className="modal open">
                  <div className="modal__content">
                    <div className="help">
                      <div id="help-step" className="help-step">
                        <img className="peak" src="/images/peak.svg" />

                        <ul className="progress-bar">
                          <li className="progress-bar__dot full"></li>
                          <li className="progress-bar__connector"></li>
                          <li className="progress-bar__dot"></li>
                          <li className="progress-bar__connector"></li>
                          <li className="progress-bar__dot"></li>
                        </ul>

                        <div className="step step1">
                          <h2>Ayuda</h2>
                          <p>
                            Para conocer esta historia de diferentes maneras deberás seleccionar uno
                          de seis personajes y elegir uno de tres modos narrativos para navegar.{' '}
                          </p>
                        </div>

                        <div className="step step2 hidden">
                          <h2>
                            <span className="step-number">1</span>Escoge uno de los personajes
                        </h2>
                          <p>
                            Dependiendo del personaje que elijas, el énfasis de la historia y sus
                            matices serán diferentes. ¡Escoge al azar o por intuición, vamos!
                        </p>
                        </div>

                        <div className="step step3 hidden">
                          <h2>
                            <span className="step-number">2</span>Escoge el modo de navegación
                        </h2>
                          <p>
                            Dependiendo del modo que elijas, los hechos serán narrados con un orden y
                            una intención diferentes.
                        </p>
                        </div>

                        <div className="button-group">
                          <button id="previous" className="disabled button">
                            Anterior
                        </button>
                          <button id="next" className="button">
                            Siguiente
                        </button>
                          <button id="validate" className="hidden button close-modal">
                            Empieza tu experiencia
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="selector-help">
                    <div className="selector-help-cover">
                      <div className="selector-help-pc">
                        <div className="selector-column">
                          <h2>
                            <img src="/images/selector-0.svg" />
                            Modo Cronologico
                        </h2>
                          <p>
                            Explora esta historia en la línea de tiempo en que sucedieron los hechos.
                        </p>
                        </div>
                        <div className="selector-column">
                          <h2>
                            <img src="/images/selector-1.svg" />
                            Modo Laberinto
                        </h2>
                          <p>Escoge ruta de entrada y recorre el cubo a tu manera.</p>
                        </div>
                        <div className="selector-column">
                          <h2>
                            <img src="/images/selector-2.svg" />
                            Modo Reflexivo
                        </h2>
                          <p>
                            ¿Tú qué opinas? Descubre cómo encaja tu forma de pensar en el universo de
                            opiniones de la sociedad.
                        </p>
                        </div>
                        <div className="selector-column-cubo cubo-pc">
                          <img className="cubo-help" src="/images/selector-cubo.svg" />
                        </div>
                      </div>

                      <div className="selector-help-mobile">
                        <div className="selector-column-cubo cubo-mobile">
                          <img className="cubo-help" src="/images/selector-cubo.svg" />
                        </div>
                        <div className="selector-column">
                          <span>
                            Modo
                          <br />
                            Cronologico
                        </span>
                        </div>
                        <div className="selector-column">
                          <span>
                            Modo
                          <br />
                            Laberinto
                        </span>
                        </div>
                        <div className="selector-column">
                          <span>
                            Modo
                          <br />
                            Reflexivo
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="characters is-hidden">
                <div className="pane-cover close"></div>

                <div className="pane">
                  <a className="close">
                    <img src="/images/pane-close.svg" />
                  </a>
                  <div className="pane-content">
                    <h2 id="name-personaje"></h2>
                    <p id="desc-personaje"></p>
                    <a id="select-personaje" href="#" data-personaje="" className="cyan-dark">
                      Elegir
                  </a>
                  </div>
                  <div className="pane-video">
                    <img className="bg-video" src="/images/bg-video.png" />
                    <video id="video1" width="420">
                      <source src="" type="video/mp4" data-personaje="" /> Your browser does not
                      support HTML video.
                  </video>
                  </div>
                </div>

                <div className="characters-wrapper">
                  <div className="fake-cover"></div>
                  <div className="row row-first">
                    {field_ec_characters.map((c) => {
                      const character = field_ec_characters_terms_json.find(
                        (ch) => Number(ch.tid) === Number(c),
                      );
                      return (
                        <div className="column" key={character.tid}>
                          <div className="parent">
                            <div
                              className={`child bg-six toggle char-${character.tid} ${character.tid}`}
                              data-video={character.field_ec_avatar_video}
                              data-personaje={character.tid}
                              data-nombre={character.character_name}
                              data-desc={character.description_value}
                            >
                              <img className="icon-selected" src="/images/is-selected.svg" />
                              <h2 className="name">{character.character_name}</h2>
                              <img className="img-bn" width="100%" src={character.field_ec_avatar_gray} />
                              <img className="img-color" width="100%" src={character.field_ec_avatar_color} />
                              <a className="projectButton">Conóceme más</a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="selector-mode is-hidden selector-desktop">
                  <div className="selector-cover">
                    <div id="mainDiv">
                      <div id="boxDiv">
                        <div id="front"></div>
                        <div id="back"></div>
                        <div id="left"><img src="https://i.imgur.com/TPcfnZm.jpeg" /></div>
                        <div id="right">

                        </div>
                        <div id="top"></div>
                        <div id="bottom"></div>

                        <div class="shadow"></div>
                      </div>
                    </div>
                    <ul>
                      <li>

                        <a href={videoLink} className="cronologico">
                          Modo Cronologico
                      </a>
                      </li>
                      <li>

                        Modo Laberinto
                    </li>
                      <li>

                        Modo Reflexivo
                    </li>
                    </ul>
                  </div>
                </div>

                <div className="selector-mode selector-mobile is-hidden">
                  <div className="selector-cover">
                    <img src="/images/selector-cubo.svg" />
                    <ul>
                      <li>
                        <a
                          href={videoLink}
                          className="cronologico"
                        >
                          Modo
                        <br />
                          Cronologico
                      </a>
                      </li>
                      <li>
                        Modo
                      <br />
                        Laberinto
                    </li>
                      <li>
                        Modo
                      <br />
                        Reflexivo
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
      </Container>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          season: 'temporada-1',
        },
      },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const [data, chronology] = await Promise.all([
    fetcher(`/api/v1/elcubo/season/4731`),
    fetcher(`/api/v1/elcubo/season/4731/chrono`),
  ]);

  // console.log({ data });
  if (!data || !data.length) {
    return { props: { data: {} } };
  }

  const { field_ec_characters, field_ec_characters_terms_json } = data[0];
  return {
    props: {
      data: {
        field_ec_characters: field_ec_characters.split(',').map((c) => c.trim()),
        field_ec_characters_terms_json: JSON.parse(field_ec_characters_terms_json),
        chronology: chronology || null,
      },
    },
    revalidate: 900,
  };
};

export default CharactersPage;
