import React from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';

const CharacterIndex = ({ character, node, bgImage, episodeData, onViewedAll }) => {
  const {
    field_ec_video_title,
    field_ec_final_question,
    children_answer_json,
    field_ec_image_bw,
    field_ec_image_color,
  } = node;
  const { field_ec_asset_id } = episodeData;
  const nextNodes = JSON.parse(children_answer_json);

  const formatText = (str) => {
    if (str === null || str === '') return false;
    str = str.toString();
    str = str.replace(/(<([^>]+)>)/gi, '');
    str = str.replace(/  +/g, ' ');
    return str;
  };

  React.useEffect(() => {
    const video = document.querySelector('.pane-video');
    const pane = document.querySelector('.pane');
    const pane_video = document.querySelector('.pane-video');

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
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      });
      if (!Hls.isSupported()) {
        video.src = source;
      } else {
        // For more Hls.js options, see https://github.com/dailymotion/hls.js
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        window.player = player;
        window.hls = hls;
        player.on('ended', () => {
          //pane_cover.classList.toggle('visible');
          // player.fullscreen.exit();
          pane.classList.toggle('open');
          pane_video.classList.toggle('visible');
          //fake_cover.classList.add('visible');
          fadeOut(pane, 40);
          // Add selected to child
          document.getElementsByClassName(pane.dataset.relation)[0].classList.add('selected');
          if (viewedAll()) {
            console.log('ENTRE A ONVIEWED ALL');
            onViewedAll();
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

    const player = loadPlayer(field_ec_asset_id);

    const createTitle = (pTitle) => {
      let plyr_title = document.createElement('h2');
      plyr_title.setAttribute('class', 'plyr_title');
      plyr_title.innerHTML = pTitle;
      return plyr_title;
    };

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
        } else {
          el.style.opacity = 1;
        }
      })();
    };

    // Pane Slide
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelectorAll('.close');

    if (button_open) {
      button_open.forEach(function(link) {
        link.addEventListener('click', () => {
          console.log('HICE CLICK ACA');
          player.currentTime = 0;
          console.log('EL TIEMPO ACTUAL ES', player.currentTime);
          pane.classList.add('open');
          pane_video.classList.toggle('visible');
          pane.dataset.relation = link.dataset.relation;
          fadeIn(pane, 40);
          player.play();
        });
      });
    }

    if (button_close) {
      button_close.forEach(function(link) {
        link.addEventListener('click', () => {
          pane.classList.toggle('open');
          fadeOut(pane, 40);
          pane_video.classList.toggle('visible');
          player.stop();
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
        [].forEach.call(personaje_child, function(el) {
          el.classList.remove('is-selected');
        });
        document
          .getElementsByClassName(button_select.dataset.personaje)[0]
          .classList.add('is-selected');
        var selector = document.querySelectorAll('.selector-mode');
        [].forEach.call(selector, function(el) {
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

    setTimeout(() => {
      fadeOut(document.querySelectorAll('.steal')[0], 60);
      let promise = player.play();
      if (promise !== undefined) {
        promise
          .then((_) => {
            // Autoplay started!
          })
          .catch((error) => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
      }
      document.getElementsByClassName('steal_title')[0].classList.add('hide');
      document.querySelectorAll('.close')[0].classList.remove('hide');
      // Add title plyr
      const controls_extra = document.querySelector('.plyr--video');
      controls_extra.prepend(createTitle(video.dataset.title));
    }, 3000);
  }, []);

  return (
    <div
      className="app-elcubo reflexivo"
      style={{ background: 'url("/images/reflexivo_bg.jpg") no-repeat' }}
    >
      <h2 className="steal_title">{field_ec_video_title}</h2>
      <img className="steal" src={bgImage} />

      <div className="pane open" data-relation="alba">
        <a className="close hide">
          <img src="/images/pane-close.svg" />
        </a>
        <div
          className="pane-video visible"
          data-video={field_ec_asset_id}
          data-poster=""
          data-title={field_ec_video_title}
        >
          <video controls crossOrigin={'true'} playsInline poster="" />
        </div>
      </div>

      <div className="characters columns-1 is-hidden">
        <div className="characters-wrapper">
          <div className="row row-cero">
            <div className="column answers-copy">
              Si ves el video completo, tendrás una pregunta para contestar
            </div>
          </div>
          <div className="row row-first">
            <div className="column">
              <div className="parent">
                <div
                  className="child bg-one alba toggle"
                  data-video="424264"
                  data-poster=""
                  data-relation="bg-one"
                >
                  <img className="icon-selected" src="/images/is-selected.svg" />
                  <div className="actions">
                    <img className="icon-selected" src="/images/is-selected.svg" />
                    <div className="icon-cover icon-play">
                      <img src="/images/play-reflexivo.svg" />
                    </div>
                    <div className="icon-cover icon-replay">
                      <img src="/images/replay-reflexivo.svg" />
                    </div>
                    <h2>{formatText(field_ec_video_title)}</h2>
                  </div>
                  <img className="img-bn" src={field_ec_image_bw} />
                  <img className="img-color" src={field_ec_image_color} />
                </div>
              </div>
            </div>
          </div>
          <div className="row row-second questions questions-2">
            <div className="column">
              <div className="video-overlay">
                <div className="copy-cover">
                  <h1 className="copy">
                    <p>{formatText(field_ec_final_question)}</p>
                    <ul className={`li-questions li-${nextNodes.length}`}>
                      {nextNodes && nextNodes.length
                        ? nextNodes.map((nextNode) => {
                            const nextPageLink = `/el-cubo/temporada-1/reflexivo/${character}/${
                              nextNode.nid
                            }`;
                            return (
                              <li key={nextNode.nid}>
                                <a href={nextPageLink}> {nextNode.field_ec_answer_title}</a>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterIndex;
