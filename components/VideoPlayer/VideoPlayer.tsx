import React from 'react';
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
}) => {
  const wrapperRef = React.useRef();
  const videoRef = React.useRef();
  const playerRef = React.useRef();
  const router = useRouter();

  React.useEffect(() => {
    const video: HTMLMediaElement = videoRef.current;

    playerRef.current = new Plyr(video, {
      enabled: true,
      // quality: {
      //   default: 576,
      //   options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      // },
      captions: { active: true, update: true, language: 'es' },
      settings: ['captions', 'quality', 'speed', 'loop'],
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
      console.log(video);

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

    if (showBackButton) {
      router.prefetch(backLink);
      const controls = container.getElementsByClassName('plyr__controls')[0];
      controls.insertAdjacentHTML(
        'afterend',
        `<button class="back-to-season">
            <img src="/images/icon-arrow-back.svg" />
            <span>Volver al inicio</span>
         </div>`,
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
    const container: HTMLElement = wrapperRef.current;

    const listener = (event) => {
      console.log('click', event.target.dataset);
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
    console.log('hidden');
    if (playerRef.current) {
      playerRef.current.on('controlshidden', (e) => onControlsHidden(e, playerRef.current));
    }
  }, [onControlsHidden]);

  React.useEffect(() => {
    console.log('shown');

    if (playerRef.current) {
      playerRef.current.on('controlsshown', (e) => onControlsShown(e, playerRef.current));
    }
  }, [onControlsShown]);

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
