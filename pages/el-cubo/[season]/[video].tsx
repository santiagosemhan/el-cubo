import React from 'react';
import { GetStaticProps } from 'next';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { Container } from 'styles/Home';
import fetch from 'libs/fetcher';
import AppLayout from 'layouts/AppLayout';
import styled from 'styled-components';

const FullPlayerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
`;

const VideoPage = () => {
  return (
    <AppLayout onlyContent>
      <Container>
        <FullPlayerWrapper>
          <VideoPlayer
            showBackButton
            backLink="/el-cubo/temporada-1"
            title="title"
            poster="/images/poster.jpeg"
            // source="https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8"
            source="https://rtvcplay-media-content.s3.amazonaws.com/vod-content/418837/418837.m3u8"
          />
        </FullPlayerWrapper>
      </Container>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { season: 'temporada-1', video: '1' } }],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/el-cubo/page/5364`);

  return {
    props: { data }, // will be passed to the page component as props
  };
};
export default VideoPage;
