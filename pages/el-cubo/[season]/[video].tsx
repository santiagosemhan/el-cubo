import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { GetStaticProps } from 'next';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { Container } from 'styles/Home';
import fetch from 'libs/fetcher';
import AppLayout from 'layouts/AppLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Error from 'next/error';
import PlayerChronology from 'components/PlayerChronology/PlayerChronology';
import useSWR from 'swr';
import CharacterSelector from 'components/CharacterSelector/CharacterSelector';
import { setTimeout } from 'timers';
import { VideoPlayerWrapper } from 'components/VideoPlayer/VideoPlayer.style';
import { ListChronoCover } from 'components/PlayerChronology/PlayerChronology.style';

const FullPlayerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
  position: relative;
`;

const VideoPage = ({ video, srcVideo, poster }) => {
  const { isFallback, query } = useRouter();

  const { modo, personaje } = query;
  if (!isFallback && !video) {
    return <Error statusCode={404} title="Video could not be found" />;
  }

  const { data: chronology, error } = useSWR(`/api/v1/elcubo/season/4731/chrono`);
  const [character, setCharacter] = useState();
  const [chronologyList, setChronologyList] = useState([]);
  const [showChapters, setShowChapters] = useState(true);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  React.useEffect(() => {
    let character;
    let chronologyList = [];
    if (chronology) {
      let characterChronology;
      characterChronology = chronology.find((c) => c.field_ec_character === personaje);
      const characterData = JSON.parse(characterChronology.field_ec_character_term_json);
      character = characterData[0].character_name;

      if (modo === 'cronologico' && chronology) {
        if (chronology && chronology.length && personaje) {
          const { field_ec_episodes, field_ec_episodes_node_json } = characterChronology;
          const episodesData = JSON.parse(field_ec_episodes_node_json);
          const episodesList = field_ec_episodes.split(',');

          chronologyList = episodesList.map((e) => {
            const episode = episodesData.find((ep) => Number(ep.nid) === Number(e));
            return {
              id: episode.nid,
              link: `/el-cubo/temporada-1/${episode.nid}?personaje=${personaje}&modo=${modo}`,
              name: episode.title,
              active: Number(video) === Number(episode.nid),
              image: episode.field_ec_video_preview_TEMP,
            };
          });
          const index = chronologyList.findIndex((el) => el.id === video);
          console.log(index);
          if (index > 0) {
            setShowPrevButton(true);
          }
          if (index < chronologyList.length - 1) {
            setShowNextButton(true);
          }
          setCharacter(character);
          setChronologyList(chronologyList);
        }
      }
    }
  }, [chronology]);

  const handleBackClick = React.useCallback(() => {
    const index = chronologyList.findIndex((el) => el.id === video);
    if (index > 0) {
      const prevChapter = chronologyList[index - 1];
      if (prevChapter) {
        window.location.href = prevChapter.link;
      }
    }
  }, [chronologyList]);

  const handleNextClick = React.useCallback(() => {
    const index = chronologyList.findIndex((el) => el.id === video);
    if (index <= chronologyList.length) {
      const nextChapter = chronologyList[index + 1];
      if (nextChapter) {
        window.location.href = nextChapter.link;
      }
    }
  }, [chronologyList]);

  const handleVideoEnded = React.useCallback(() => {
    const index = chronologyList.findIndex((el) => el.id === video);
    if (index <= chronologyList.length) {
      const nextChapter = chronologyList[index + 1];
      if (nextChapter) {
        window.location.href = nextChapter.link;
      }
    }
  }, [chronologyList]);

  const handleChapterClick = () => setShowChapters(!showChapters);

  return (
    <AppLayout onlyContent>
      <Container>
        {isFallback ? (
          <div>Loading...</div>
        ) : (
          <FullPlayerWrapper>
            {/* <CharacterSelector /> */}
            <VideoPlayer
              showBackButton
              backLink="/el-cubo/temporada-1"
              title="title"
              poster={poster}
              source={srcVideo}
              onBackClick={handleBackClick}
              onNextClick={handleNextClick}
              onChaptersClick={handleChapterClick}
              chapterButtonName={showChapters ? 'Ocultar Cronología' : 'Mostrar Cronología'}
              showPrevButton={showPrevButton}
              showNextButton={showNextButton}
              onVideoEnded={handleVideoEnded}
            >
              {showChapters && modo === 'cronologico' && chronology && (
                <PlayerChronology character={character} chronology={chronologyList} />
              )}
            </VideoPlayer>
          </FullPlayerWrapper>
        )}
      </Container>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const episodes = await fetch(`/api/v1/elcubo/season/4731/episode/all`);
  const paths = episodes.map((ep) => ({
    params: {
      season: 'temporada-1',
      video: ep.nid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const chapter = await fetch(`/api/v1/elcubo/season/4731/episode/${params.video}`);
  let srcVideoId = chapter[0]?.field_ec_asset_id_TEMP;
  const srcVideo = srcVideoId
    ? `https://rtvcplay-media-content.s3.amazonaws.com/vod-content/${srcVideoId}/${srcVideoId}.m3u8`
    : undefined;
  return {
    props: {
      video: params.video,
      srcVideo: srcVideo || null,
      poster: chapter[0]?.field_ec_video_preview_TEMP || null,
    }, // will be passed to the page component as props
    revalidate: 900,
  };
};
export default VideoPage;
