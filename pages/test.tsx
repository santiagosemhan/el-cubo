import React from 'react';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import AppLayout from 'layouts/AppLayout';
import { Container } from 'styles/Home';

const test = () => {
  return (
    <AppLayout>
      <Container>
        <VideoPlayer
          title="title"
          poster="/images/poster.jpeg"
          // source="https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8"
          source="https://rtvcplay-media-content.s3.amazonaws.com/vod-content/418837/418837.m3u8"
          // source="https://rtvcplay-media-content.s3.amazonaws.com/vod-content/415681/415681720.m3u8"
          // source="https://rtvcplay-media-content.s3.amazonaws.com/vod-content/415681/415681.m3u8"
        />
      </Container>
    </AppLayout>
  );
};

export default test;
