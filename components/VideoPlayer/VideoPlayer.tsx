import React from 'react';
import Plyr from 'plyr';
import HLS from 'hls.js';
import { useRouter } from 'next/router';

import 'plyr/dist/plyr.css';
import { VideoPlayerWrapper } from './VideoPlayer.style';

const VideoPlayer = ({ source, poster, title, showBackButton = false, backLink = '/' }) => {
  const wrapperRef = React.useRef();
  const videoRef = React.useRef();
  const router = useRouter();

  React.useEffect(() => {
    const video: HTMLMediaElement = videoRef.current;

    const player = new Plyr(video, {
      enabled: true,
      // quality: {
      //   default: 576,
      //   options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      // },
      captions: { active: true, update: true, language: 'es' },
      settings: ['captions', 'quality', 'speed', 'loop'],
    });

    if (wrapperRef.current) {
      player.on('enterfullscreen', () => wrapperRef.current.classList.add('in-fullscreen'));
      player.on('exitfullscreen', () => wrapperRef.current.classList.remove('in-fullscreen'));
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
      controls.insertAdjacentHTML('afterend', `<button class="back-to-season"> Volver </div>`);
      const backToButton = container.getElementsByClassName('back-to-season')[0];
      backToButton.addEventListener('click', () => router.push(backLink));
    }

    const playControl = container.querySelector('[data-plyr="play"]');
    playControl.insertAdjacentHTML(
      'afterend',
      `<button class="plyr__controls__item plyr__control back" data-plyr="back">Anterior</button>
       <button class="plyr__controls__item plyr__control next" data-plyr="next">Siguiente</button>
      `,
    );

    const menuControl = container.querySelector('[data-plyr="settings"]');
    menuControl.insertAdjacentHTML(
      'afterend',
      '<button class="plyr__controls__item plyr__control" data-plyr="chapters">ver cronología</button>',
    );

    const backButton = container.querySelector('[data-plyr="back"]');
    backButton.addEventListener('click', () => alert('back'));
  }, []);

  return (
    <VideoPlayerWrapper ref={wrapperRef}>
      <video ref={videoRef} controls crossOrigin="true" playsInline poster={poster}></video>
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
