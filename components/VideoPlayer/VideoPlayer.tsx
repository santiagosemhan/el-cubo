import React from 'react';
import ReactDOM from 'react-dom';

import Plyr from 'plyr';
import HLS from 'hls.js';
import { useRouter } from 'next/router';

import 'plyr/dist/plyr.css';
import { VideoPlayerWrapper } from './VideoPlayer.style';

const VideoPlayer = ({
  source,
  poster,
  title,
  showBackButton = false,
  backLink = '/',
  chapterButtonName = 'Chapters',
  showPrevButton = true,
  showNextButton = true,
  onBackClick,
  onNextClick,
  onChaptersClick,
  onVideoEnded,
  onControlsHidden,
  onControlsShown,
  onVideoPause,
  onVideoPlaying,
  children,
}) => {
  const wrapperRef = React.useRef();
  const videoRef = React.useRef();
  const playerRef = React.useRef();
  const router = useRouter();

  React.useEffect(() => {
    const video: HTMLMediaElement = videoRef.current;
    function updateQuality(newQuality) {
      if (window.hls) {
        window.hls.levels.forEach((level, levelIndex) => {
          console.log(level.height, newQuality);
          if (level.height === newQuality) {
            console.log('Found quality match with ' + newQuality);
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }

    playerRef.current = new Plyr(video, {
      enabled: true,
      quality: {
        default: 720,
        options: [720, 360, 270],
        forced: true,
        onChange: (e) => updateQuality(e),
      },
      i18n: {
        restart: 'Restart',
        rewind: 'Rewind {seektime} secs',
        play: 'Play',
        pause: 'Pause',
        fastForward: 'Forward {seektime} secs',
        seek: 'Seek',
        played: 'Played',
        buffered: 'Buffered',
        currentTime: 'Current time',
        duration: 'Duration',
        volume: 'Volume',
        mute: 'Mute',
        unmute: 'Unmute',
        enableCaptions: 'Enable captions',
        disableCaptions: 'Disable captions',
        enterFullscreen: 'Enter fullscreen',
        exitFullscreen: 'Exit fullscreen',
        frameTitle: 'Player for {title}',
        captions: 'Subtítulos',
        settings: 'Configuraciones',
        speed: 'Velocidad',
        normal: 'Normal',
        quality: 'Calidad',
        loop: 'Loop',
        start: 'Start',
        end: 'End',
        all: 'All',
        reset: 'Reset',
        disabled: 'Disabled',
        advertisement: 'Ad',
      },
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'airplay',
        'fullscreen',
      ],
      captions: { active: true, update: true, language: 'es' },
      settings: ['quality'],
    });

    if (wrapperRef.current) {
      playerRef.current.on('enterfullscreen', () =>
        wrapperRef.current.classList.add('in-fullscreen'),
      );
      playerRef.current.on('exitfullscreen', () =>
        wrapperRef.current.classList.remove('in-fullscreen'),
      );
    }

    if (!HLS.isSupported()) {
      video.src = source;
    } else {
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new HLS();
      hls.loadSource(source);
      hls.attachMedia(video);
      window.hls = hls;
      // Handle changing captions
      // player.on('languagechange', () => {
      //   // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      //   setTimeout(() => (hls.subtitleTrack = player.currentTrack), 50);
      // });
    }
    const container: HTMLElement = wrapperRef.current;

    const controls = container.getElementsByClassName('plyr__controls')[0];
    controls.insertAdjacentHTML(
      'afterend',
      `
      <div class="plyr__extra_controls">
        <div id="plyr__portal" class="plyr__portal"></div>
      </div>
    `,
    );

    if (showBackButton) {
      router.prefetch(backLink);
      const controls = container.getElementsByClassName('plyr__portal')[0];
      controls.insertAdjacentHTML(
        'afterend',
        `
          <button class="back-to-season">
            <img src="/images/icon-arrow-back.svg" />
            <span>Volver al inicio</span>
          </button>
        `,
      );
      const backToButton = container.getElementsByClassName('back-to-season')[0];
      backToButton.addEventListener('click', () => router.push(backLink));
    }

    const menuControl = container.querySelector('.plyr__volume');
    menuControl.insertAdjacentHTML(
      'afterend',
      `<button class="plyr__controls__item plyr__control" data-plyr="chapters">${chapterButtonName}</button>`,
    );
  }, []);

  React.useEffect(() => {
    // const plyr = container.getElementsByClassName('plyr')[0];
    const portal = document.getElementById('plyr__portal');
    ReactDOM.render(children, portal);
  }, [children]);

  React.useEffect(() => {
    const container: HTMLElement = wrapperRef.current;

    const listener = (event) => {
      const { plyr } = event.target.dataset;
      if (plyr) {
        if (plyr === 'chapters') onChaptersClick && onChaptersClick();
        if (plyr === 'back') onBackClick && onBackClick();
        if (plyr === 'next') onNextClick && onNextClick();
      }
    };
    container.addEventListener('click', listener);

    return () => container.removeEventListener('click', listener);
  }, [onChaptersClick, onBackClick, onNextClick]);

  React.useEffect(() => {
    const container: HTMLElement = wrapperRef.current;
    const playControl = container.querySelector('[data-plyr="play"]');
    playControl.insertAdjacentHTML(
      'afterend',
      `
        ${
          showPrevButton
            ? '<button class="plyr__controls__item plyr__control back" data-plyr="back">Anterior</button>'
            : ''
        } 
        ${
          showNextButton
            ? ' <button class="plyr__controls__item plyr__control next" data-plyr="next">Siguiente</button>'
            : ''
        } 
      `,
    );
  }, [showPrevButton, showNextButton]);

  React.useEffect(() => {
    const container: HTMLElement = wrapperRef.current;
    if (title) {
      const controls = container.getElementsByClassName('plyr__portal')[0];
      controls.insertAdjacentHTML('afterend', `<h2 class="plyr__portal__title">${title}</h2>`);
    }
  }, [title]);

  React.useEffect(() => {
    const container: HTMLElement = wrapperRef.current;
    const chaptersButton = container.querySelector('[data-plyr="chapters"]');
    chaptersButton.innerHTML = chapterButtonName;
  }, [chapterButtonName]);

  React.useEffect(() => {
    console.log(videoRef.current);
    if (videoRef.current && onVideoEnded) {
      videoRef.current.onended = onVideoEnded;
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.onended = undefined;
      }
    };
  }, [onVideoEnded]);

  React.useEffect(() => {
    if (playerRef.current) {
      playerRef.current.on('controlsshown', onControlsShown);
      playerRef.current.on('controlshidden', onControlsHidden);
      playerRef.current.on('playing', onVideoPlaying);
      playerRef.current.on('pause', onVideoPause);
    }
  }, [onControlsShown, onControlsHidden, onVideoPause, onVideoPlaying]);

  return (
    <VideoPlayerWrapper ref={wrapperRef}>
      <video
        ref={videoRef}
        controls
        crossOrigin="true"
        playsInline
        poster={poster}
        autoPlay={true}
      />
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
