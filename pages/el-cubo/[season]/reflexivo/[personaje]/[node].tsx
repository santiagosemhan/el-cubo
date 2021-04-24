import React, { useState } from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import Hls from 'hls.js';
import Plyr from 'plyr';
import { ReflexiveStyles } from 'styles/reflexive.style';
import { NavReflexiveStyles } from 'styles/navreflexive.style';
import VideoItem from 'components/Reflexive/VideoItem';
import BackToCharacters from 'components/Reflexive/BackToCharacters';
import fetcher from 'libs/fetcher';
import AuthService from 'services/Auth';
import UserService from 'services/User';
import NodesUtils from 'utils/Nodes';

const ReflexiveNode = ({ character, data, nodeId }) => {

  const isLoggedIn = AuthService.isLoggedIn();
  const [user, setUser] = useState(null);
  const {
    field_ec_final_question,
    field_ec_order_reflex_items_json_episode_json,
    children_answer_json,
  } = data;
  const answers = JSON.parse(children_answer_json);
  const reflexItemsEpisode = JSON.parse(field_ec_order_reflex_items_json_episode_json);

  const updateUser = async (id, data) => {
    await UserService.update(id, data);
  };

  React.useEffect(() => {
    if (user) {
      try {
        const readNodesString = user.elcubo_reflexivo;
        const readNodesJSON = JSON.parse(readNodesString);
        const nodes = NodesUtils.cleanReflexive(readNodesJSON, nodeId);
        updateUser(user.id, {
          field_ec_reflexive_data_json: {
            value: JSON.stringify(nodes)
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const getMe = async () => {
    try {
      const me = await UserService.getMe();
      setUser(me.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatText = (str) => {
    if ((str === null) || (str === '')) return false;
    str = str.toString();
    str = str.replace(/(<([^>]+)>)/ig, '');
    str = str.replace(/  +/g, ' ');
    return str;
  };

  React.useEffect(() => {
    getMe();
  }, []);

  React.useEffect(() => {

    // Pane Slide
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelectorAll('.close');
    const pane = document.querySelector('.pane');
    const pane_video = document.querySelector('.pane-video');
    let player;

    const fadeOut = (el, pTime) => {
      el.style.opacity = 1;

      (function fade() {
        if ((el.style.opacity -= 0.07) < 0) {
          el.style.display = 'none';
        } else {
          setTimeout(fade, pTime);
        }
      })();
    };

    const fadeIn = (el, pTime) => {
      el.style.opacity = 0;
      el.style.display = 'block';

      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.07) > 1)) {
          el.style.opacity = val;
          setTimeout(fade, pTime);
        }
        else {
          el.style.opacity = 1;
        }
      })();
    };

    const createTitle = (pTitle) => {
      let plyr_title = document.createElement('h2');
      plyr_title.setAttribute('class', 'plyr_title');
      plyr_title.innerHTML = pTitle;
      return plyr_title;
    };

    const removeTitleVideo = () => {
      let elms = document.querySelectorAll('.plyr_title');
      elms.forEach(el => el.remove());
    };

    const loadPlayer = (sURL) => {
      let source =
        'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:' + sURL + '.smil/playlist.m3u8';
      const video = document.querySelector('video');
      const player = new Plyr(video, {
        captions: {
          active: true,
          update: true,
          language: 'en',
        },
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen',
        ],
      });
      if (!Hls.isSupported()) {
        video.src = source;
      } else {
        // For more Hls.js options, see https://github.com/dailymotion/hls.js
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        window.hls = hls;
        window.player = player;

        player.on('ended', function () {
          //pane_cover.classList.toggle('visible');
          pane.classList.toggle('open');
          pane_video.classList.toggle('visible');
          fadeOut(pane, 40);
          // Add selected to child
          document.getElementsByClassName(pane.dataset.relation)[0].classList.add('selected');
          if (viewedAll()) {
            document.getElementsByClassName('row-second')[0].classList.add('visible');
            document.getElementsByClassName('characters')[0].classList.add('is-viewed');
          }
        });

        // Show Hide Title
        player.on('controlsshown', () => {
          document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
        });
        player.on('controlshidden', () => {
          document.getElementsByClassName('plyr_title')[0].classList.add('hide');
        });

      }
      return player;
    };


    if (button_open) {
      button_open.forEach((link) => {
        link.addEventListener('click', () => {
          player = loadPlayer(link.dataset.video);
          pane.classList.add('open');
          pane.dataset.relation = link.dataset.relation;
          pane_video.classList.toggle('visible');
          fadeIn(pane, 40);


          removeTitleVideo();
          // Add title plyr
          const controls_extra = document.querySelector('.plyr--video');
          controls_extra.prepend(createTitle(link.dataset.title));

          player.play();
          //document.querySelector('video').setAttribute('src', '');
          // Hide temp progress
          document.querySelectorAll('.progress-0')[0].classList.add('hide');
        });
      });
    }

    if (button_close) {
      button_close.forEach((link) => {
        link.addEventListener('click', () => {
          pane.classList.toggle('open');
          fadeOut(pane, 40);
          pane_video.classList.toggle('visible');
          //fake_cover.classList.add('visible');
          player.stop();
          player = loadPlayer(null);
        });
      });
    }

    const button_select = document.getElementById('select-personaje');
    let character = 'unselect';

    if (button_select) {
      button_select.addEventListener('click', () => {
        character = button_select.dataset.personaje;
        pane.classList.toggle('open');
        pane_video.classList.toggle('visible');
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
      });
    }

    // Check si ya fueron visto los 3
    const viewedAll = () => {
      let all_videos = document.querySelectorAll('.toggle').length;
      let viewed_videos = document.querySelectorAll('.toggle.selected').length;

      if (all_videos === viewed_videos) {
        return true;
      } else {
        return false;
      }
    };
    /* Fake cover */
    const fake_cover = document.querySelector('.fake-cover');
    // Disabled fake cover
    /*fake_cover.addEventListener('mousemove', () => {
            fake_cover.classList.remove('visible');      });*/
    const loadProgress = (sPar, sVelocity) => {
      // Timer
      let timer = 0;
      let limit = sVelocity; //ms
      let timerEnd = limit / 10;
      let blockWidth = 100 / timerEnd;
      const progress = document.querySelectorAll('.' + sPar + ' .progress');

      let countdown = setInterval(() => {
        timer++;
        for (let i = 0; i < progress.length; ++i) {
          progress[i].style.width = timer * blockWidth + '%';
          // setear a 0
          if (document.querySelector('.pane').classList.contains('open')) {
            clearInterval(countdown);
          }
        }
        //console.log(timer);
        // document.getElementById("countdown").textContent = timer/100;
        if (timer >= timerEnd) {
          clearInterval(countdown);
          document.getElementsByClassName('toggle')[0].click();
        }
      }, 10);
    };

    // Para cuando no hay modal al inicio
    const progress_direct = document.getElementsByClassName('progress-direct')[0];
    if (progress_direct) {
      let velocity = document.getElementsByClassName('progress-0')[0].dataset.velocity;
      if (velocity !== undefined) {
        console.log('a verrrr' + velocity);
        loadProgress('progress-0', velocity);
      } else {
        loadProgress('progress-0', 3000);
      }
    }

    /* Hover */
    let select_scene = document.querySelectorAll('.parent');

    if (select_scene) {
      [].forEach.call(select_scene, (el) => {
        el.addEventListener(
          'mouseenter',
          () => {
            // highlight the mouseenter target
            el.classList.add('focus');
          },
          false,
        );
        el.addEventListener(
          'mouseleave',
          () => {
            // highlight the leave target
            setTimeout(() => {
              el.classList.remove('focus');
            }, 0);
          },
          false,
        );
      });
    }
  }, []);

  return (
    <AppLayout onlyContent>
      <Head>
        <title>Reflexivo - El cubo</title>
        <link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />
      </Head>
      <ReflexiveStyles />
      <NavReflexiveStyles />

      <BackToCharacters text={'Volver al inicio'} />

      <div
        className="app-elcubo reflexivo"
        style={{ background: 'url("/images/reflexivo_bg.jpg") no-repeat' }}
      >
        <div className="pane" data-relation="alba">
          <a className="close">
            <img src="/images/pane-close.svg" />
          </a>
          <div className="pane-video" data-video="" data-poster="" data-title="">
            <video controls crossOrigin="true" playsInline poster="" />
          </div>
        </div>
        <div className={`characters columns-${reflexItemsEpisode.length} is-hidden`}>
          <div className="characters-wrapper">
            <div className="fake-cover visible" />
            <div className="row row-cero">
              <div className="column answers-copy">
                Si ves los videos completos, tendrás una pregunta para contestar
              </div>
            </div>
            <div className="row row-first">
              {reflexItemsEpisode
                ? reflexItemsEpisode.map((episodeData, index) => {
                  const order = index;
                  return <VideoItem key={index} order={order} data={episodeData} />;
                })
                : null}
            </div>
            <div className={`row row-second questions ${answers && answers.length ? '' : 'last-node'}`}>
              <div className="column">
                <div className="video-overlay">
                  <div className="copy-cover">
                    <h1 className="copy">
                      <p>{formatText(field_ec_final_question)}</p>
                      <ul className={`li-questions ${answers && answers.length ? `li-${answers.length}` : ''}`}>
                        {answers && answers.length ?
                          answers.map((answer) => {
                            const nextPageLink = `/el-cubo/temporada-1/reflexivo/${character}/${answer.nid}`;
                            return (
                              <li key={`key_${answer.nid}`}>
                                <a href={nextPageLink}>{answer.field_ec_answer_title}</a>
                              </li>
                            );
                          })
                          :
                          <div>
                            <h1>
                              ¡Has llegado al final del modo reflexivo de {character.toUpperCase()}!
                            </h1>
                            <p>
                              Puedes ver tu perfil según las respuetas que diste en el recorrido. ¡Esa es tu recompensa!
                            </p>
                            <div className="cover-link">
                              <a href={`/el-cubo/temporada-1/reflexivo/recompensa`} className="button-cyan">
                                <span>Ver recompensa</span>
                                <img src="/images/icon-arrow-init.svg" />
                              </a>
                            </div>
                          </div>
                        }
                      </ul>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const nodes = await fetcher('/api/v1/elcubo/season/4731/reflexive/paths');
  const pathsData = nodes.map((node) => ({
    nodeId: node.nid,
    characterName: node.field_ec_character
      .split(' ')
      .slice(-1)
      .join(' ')
      .trim()
      .toLowerCase(),
  }));

  return {
    paths: pathsData.map((data) => ({
      params: { season: 'temporada-1', personaje: data.characterName, node: String(data.nodeId) },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeId = context.params.node;
  const nodeData = await fetcher(`/api/v1/elcubo/season/4731/reflexive/${nodeId}`);

  return {
    props: {
      character: context.params.personaje,
      data: nodeData[0],
      nodeId,
    },
  };
};

export default ReflexiveNode;
