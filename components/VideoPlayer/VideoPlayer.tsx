import React from 'react';
import Plyr from 'plyr';
import HLS from 'hls.js';

import 'plyr/dist/plyr.css';
import { VideoPlayerWrapper } from './VideoPlayer.style';

const VideoPlayer = ({ source, poster, title }) => {
  const wrapperRef = React.useRef();
  const videoRef = React.useRef();

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

    const playControl = container.querySelector('[data-plyr="play"]');
    playControl.insertAdjacentHTML(
      'afterend',
      `<button class="plyr__controls__item plyr__control back" data-plyr="back">Back</button>
       <button class="plyr__controls__item plyr__control next" data-plyr="next">Next</button>
      `,
    );

    const menuControl = container.querySelector('[data-plyr="settings"]');
    menuControl.insertAdjacentHTML(
      'afterend',
      '<button class="plyr__controls__item plyr__control" data-plyr="chapters">chapters</button>',
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
