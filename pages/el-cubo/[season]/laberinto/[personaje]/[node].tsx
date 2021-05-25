import React, { useState } from 'react';
import AppLayout from 'layouts/AppLayout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { NavLabyrinthStyles } from 'styles/navlabyrinth.style';
import { LabyrinthStyles } from 'styles/labyrinth.style';
import LabVideoPlayer from 'components/Labyrinth/LabVideoPlayer';
import BackToCharacters from 'components/Labyrinth/BackToCharacters';
import CommentsBubble from 'components/Labyrinth/CommentsBubble';
import fetcher from 'libs/fetcher';
import AuthService from 'services/Auth';
import UserService from 'services/User';
import ModesUtils from 'utils/Modes';
import { season1_id } from 'constants/Season';
import UrlUtils from 'utils/Url';

const LabyrinthNode = ({ data, character }) => {

  const { query } = useRouter();
  const { initial } = query;

  const isLoggedIn = AuthService.isLoggedIn();
  const nextNodes = data.field_ec_labyrinth_items_json;
  const nodeId = data.nid;
  const characterId = data.field_ec_character;
  const videoForceEnd = data.field_ec_trigger_end_video;
  const [currentCharacter, setCurrentCharacter] = useState(null);

  const updateUser = async () => {
    try {
      const { data } = await UserService.getMe();
      const userLabyrinthDataString = data.elcubo_laberinto;
      const userLabyrinthDataJSON = JSON.parse(userLabyrinthDataString);
      if (userLabyrinthDataJSON && userLabyrinthDataJSON.currentCharacter) {
        setCurrentCharacter(userLabyrinthDataJSON.currentCharacter);
      }
      const userLabyrinthData = ModesUtils.setCharacterNodesLabyrinth(userLabyrinthDataJSON, character, nodeId, nextNodes, initial, characterId);
      await UserService.update(data.id, {
        field_ec_labyrinth_data_json: {
          value: JSON.stringify(userLabyrinthData),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      updateUser();
    }
  }, [initial]);

  React.useEffect(() => {
    // Comment trigger
    let videoAlreadyViewed = false;
    // Pane Slide
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelectorAll('.close');
    const pane = document.querySelector('.pane');
    // Select option
    const answer_select = document.querySelectorAll('.pulse');
    // Pane Slide Comments
    const button_open_comments = document.querySelectorAll('.open-comments');
    const button_close_comments = document.querySelector('.close-comments');
    const pane_comments = document.querySelector('.pane-comments');
    const pane_cover_comments = document.querySelector('.pane-cover-comments');
    // Video variables
    const video = document.querySelector('.pane-video');
    const time_comments = video.dataset.comments;
    let video_duration = 0;
    const commentsBubble = document.querySelectorAll('.comments-bullet')[0];
    const paneCoverComments = document.querySelectorAll('.pane-cover-comments')[0];
    const paneComments = document.querySelectorAll('.pane-comments')[0];
    const headerTop = document.querySelectorAll('.header-top')[0];
    const paneClose = document.querySelectorAll('.close')[0];

    const calculatePercent = (num1, total) => {
      return (num1 / total) * 100;
    };

    const createSquare = (pClass) => {
      let percent = calculatePercent(time_comments, video_duration);
      let square = document.createElement('div');
      square.setAttribute('class', pClass);
      square.setAttribute('style', 'left: ' + percent + '%;');
      return square;
    };

    const updateMarker = (square) => {
      let percent = calculatePercent(time_comments, video_duration);
      square.setAttribute('style', 'left: ' + percent + '%;');
    };

    const updateQuality = (newQuality) => {
      if (window.hls) {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    };

    const loadPlayer = (sURL) => {
      let source = UrlUtils.getVideoUrl(sURL);
      const video = document.querySelector('video');
      const player = new Plyr(video, {
        captions: {
          active: true,
          update: true,
          language: 'es',
        },
        quality: {
          default: 720,
          options: [720, 360, 270],
          forced: true,
          onChange: (e) => updateQuality(e),
        },
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality'],
      });
      if (!Hls.isSupported()) {
        video.src = source;
      } else {
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        window.hls = hls;
        player.on('play', (event) => {
          video_duration = player.duration;
          setInterval(() => {
            if (time_comments) {
              setTime(time_comments);
              const controls = document.querySelector('.plyr__progress');
              if (document.querySelector('.marker') == null) {
                controls.appendChild(createSquare('marker'));
              }
            }
            // Force close end
            if (videoForceEnd && videoForceEnd > 0) {
              if (player.duration - player.currentTime <= Number(videoForceEnd)) {
                /*pane.classList.add('is-hidden');
                pane.classList.remove('open');
                document.getElementsByClassName('app-elcubo')[0].append(headerTop);
                document.getElementsByClassName('app-elcubo')[0].append(paneClose);
                videoAlreadyViewed = true;

                fadeOut(pane, 60);
                hideComments();
                player.stop();
                */

              }
            }
          }, 1000);
          // Add time marker
          const controls_extra = document.querySelector('.plyr--video');
          controls_extra.prepend(commentsBubble);
          controls_extra.prepend(paneCoverComments);
          controls_extra.prepend(paneComments);
          controls_extra.prepend(headerTop);
          controls_extra.prepend(paneClose);
        });
        player.on('ended', (event) => {
          //if (!(videoForceEnd && videoForceEnd > 0)) {
          pane.classList.add('is-hidden');
          document.getElementsByClassName('app-elcubo')[0].append(headerTop);
          document.getElementsByClassName('app-elcubo')[0].append(paneClose);
          videoAlreadyViewed = true;
          fadeOut(pane, 80);

          paneClose.classList.add('hide');
          hideComments();
          //}
        });

        player.on('controlsshown', (event) => {
          const plyrTitle = document.getElementsByClassName('plyr_title');
          if (plyrTitle && plyrTitle.length) {
            document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
            headerTop.classList.remove('hide');
            if (videoAlreadyViewed) {
              paneClose.classList.remove('hide');
            }
          }
        });
        player.on('controlshidden', (event) => {
          const plyrTitle = document.getElementsByClassName('plyr_title');
          if (plyrTitle && plyrTitle.length) {
            document.getElementsByClassName('plyr_title')[0].classList.add('hide');
            headerTop.classList.add('hide');
            if (videoAlreadyViewed) {
              paneClose.classList.add('hide');
            }
          }
        });
      }
      return player;
    };

    const fadeOut = (el, pTime) => {
      el.style.opacity = 1;
      const fade = () => {
        if ((el.style.opacity -= 0.07) < 0) {
          el.style.display = 'none';
        } else {
          setTimeout(fade, pTime);
        }
      };
      fade();
    };

    const fadeIn = (el, pTime) => {
      el.style.opacity = 0;
      el.style.display = 'block';
      const fade = () => {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.07) > 1)) {
          el.style.opacity = val;
          setTimeout(fade, pTime);
        } else {
          el.style.opacity = 1;
        }
      };
      fade();
    };

    const showComments = () => {
      document.querySelectorAll('.comments-bullet')[0].classList.add('visible');
    };

    const hideComments = () => {
      document.querySelectorAll('.comments-bullet')[0].classList.remove('visible');
    };

    const setTime = (pTimeComments) => {
      let time_end = parseInt(pTimeComments) + 15;
      const marker = document.querySelector('.marker');
      if (marker) {
        updateMarker(marker);
      }

      if (pTimeComments < player.currentTime && player.currentTime < time_end) {
        showComments();
      } else {
        hideComments();
      }
    };

    const createTitle = (pTitle) => {
      let plyr_title = document.createElement('h2');
      plyr_title.setAttribute('class', 'plyr_title');
      plyr_title.innerHTML = pTitle;
      return plyr_title;
    };

    const player = loadPlayer(video.dataset.video);

    // Fix mobile Tap play/pause
    const { wrapper, container } = player.elements;
    if (container) {
      if (!container._clickListener) {
        container._clickListener = (event) => {
          const targets = [container, wrapper];

          // Ignore if click if not container or in video wrapper
          if (!targets.includes(event.target) && !wrapper.contains(event.target)) {
            return;
          }

          if (player.touch) player.togglePlay();
        };
        container.addEventListener('click', container._clickListener);
      }
    }

    if (isIOS) {
      const videoFake = document.querySelector('video');
      videoFake.addEventListener('click', () => {
        player.togglePlay();
      });

      window.addEventListener("orientationchange", function (event) {
        var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

        if (["landscape-primary", "landscape-secondary"].indexOf(orientation) != -1) {
          becomeFullscreen();
        }
      });

    }


    if (button_open) {
      button_open.forEach((link) => {
        link.addEventListener('click', () => {
          fadeIn(pane, 60);
          pane.classList.add('open');
          pane.classList.remove('is-hidden');
          player.play();
        });
      });
    }

    if (button_close) {
      button_close.forEach((link) => {
        link.addEventListener('click', () => {
          fadeOut(pane, 20);
          pane.classList.remove('open');
          document.getElementsByClassName('app-elcubo')[0].append(headerTop);
          document.getElementsByClassName('app-elcubo')[0].append(paneClose);

          paneClose.classList.add('hide');

          hideComments();
          player.pause();
        });
      });
    }

    if (answer_select) {
      answer_select.forEach((link) => {
        link.addEventListener('click', () => {
          window.location.href = link.dataset.rel;
        });
      });
    }

    if (button_open_comments) {
      button_open_comments.forEach((link) => {
        link.addEventListener('click', () => {
          pane_comments.classList.add('open');
          pane_cover_comments.classList.toggle('visible');
          player.pause();
        });
      });
    }

    if (button_close_comments) {
      button_close_comments.addEventListener('click', () => {
        pane_comments.classList.remove('open');
        pane_cover_comments.classList.remove('visible');
        player.play();
      });
    }

    const onLoadFadeout = () => {
      window.setTimeout(() => {
        fadeOut(document.querySelectorAll('.steal')[0], 40);
        document.querySelectorAll('.pane-video')[0].classList.add('visible');
        player.play();
        document.getElementsByClassName('steal_title')[0].classList.add('hide');

        // Add title plyr
        const controls_extra = document.querySelector('.plyr--video');
        controls_extra.prepend(createTitle(video.dataset.title));
      }, 3000);
    };
    onLoadFadeout();



    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      const videoFake = document.querySelector('video');

      videoFake.onplay = (event) => {
        video_duration = player.duration;

        setInterval(() => {
          if (time_comments) {
            setTime(time_comments);
            const controls = document.querySelector('.plyr__progress');
            if (document.querySelector('.marker') == null) {
              controls.appendChild(createSquare('marker'));
            }
          }
          // Force close end
          if (videoForceEnd && videoForceEnd > 0) {
            if (player.duration - player.currentTime <= Number(videoForceEnd)) {
              /*pane.classList.add('is-hidden');
              pane.classList.remove('open');
              document.getElementsByClassName('app-elcubo')[0].append(headerTop);
              document.getElementsByClassName('app-elcubo')[0].append(paneClose);
              videoAlreadyViewed = true;
 
              fadeOut(pane, 60);
              hideComments();
              player.stop();
              */

            }
          }
        }, 1000);
        // Add time marker
        const controls_extra = document.querySelector('.plyr--video');
        controls_extra.prepend(commentsBubble);
        controls_extra.prepend(paneCoverComments);
        controls_extra.prepend(paneComments);
        controls_extra.prepend(headerTop);
        controls_extra.prepend(paneClose);


        document.getElementsByClassName('plyr_title')[0].classList.add('hide');
        headerTop.classList.add('hide');
        paneClose.classList.add('hide');
      };


      videoFake.onended = (event) => {
        pane.classList.add('is-hidden');
        document.getElementsByClassName('app-elcubo')[0].append(headerTop);
        document.getElementsByClassName('app-elcubo')[0].append(paneClose);
        videoAlreadyViewed = true;
        fadeOut(pane, 80);

        paneClose.classList.add('hide');
        hideComments();
      };

      videoFake.onpause = (event) => {
        document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
        headerTop.classList.remove('hide');
        paneClose.classList.remove('hide');
      };
    }

  }, []);

  return (
    <AppLayout onlyContent>
      <NavLabyrinthStyles />
      <LabyrinthStyles />
      <Head>
        <title>Laberinto - El cubo</title>
      </Head>
      <BackToCharacters text={'Volver a elegir personajes'} />
      <LabVideoPlayer data={data} currentCharacter={currentCharacter} isLoggedIn={isLoggedIn} />
      <CommentsBubble data={data} />
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const nodes = await fetcher(`/api/v1/elcubo/season/${season1_id}/labyrinth/all`);
  const pathsData = nodes.map((node) => ({
    nodeId: node.nid,
    characterName: node.field_ec_character_json[0].character_name
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
  const character = context.params.personaje;
  const nodeData = await fetcher(`/api/v1/elcubo/season/${season1_id}/labyrinth/${nodeId}`);

  return {
    props: {
      data: nodeData[0],
      character,
    },
  };
};

export default LabyrinthNode;
