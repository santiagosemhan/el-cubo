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
import { ElcuboGlobalStyles } from 'styles/elcubo.style';
import HeaderTop from 'components/HeaderTop/HeaderTop';
import { MenuPlayerStyle } from 'styles/menu-player.style';
import Head from 'next/head';

const FullPlayerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
  position: relative;
`;

const VideoPage = ({ title, video, srcVideo, poster }) => {
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
  const [characterList, setCharacterList] = useState([]);
  const [videoTitle, setVideoTitle] = useState();

  React.useEffect(() => {


    /*
    window.onload = function () {
      setTimeout(() => {
        // document.querySelectorAll('.steal')[0].classList.add('black');
        fadeOut(document.querySelectorAll('.steal')[0], 50);
        fadeOut(document.querySelectorAll('.steal_title')[0], 50);

      }, 3000);
    };

    function fadeOut(el, pTime) {
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= .07) < 0) {
          el.style.display = "none";
        } else {
          setTimeout(fade, pTime);
        }
      })();
    }*/

    let character;
    let chronologyList = [];
    if (chronology) {
      let characterChronology;
      characterChronology = chronology.find((c) => c.field_ec_character === personaje);
      console.log(characterChronology);
      const characterData = JSON.parse(characterChronology.field_ec_character_term_json);
      character = characterData[0].character_name;
      if (modo === 'cronologico' && chronology) {
        if (chronology && chronology.length && personaje) {
          const { field_ec_episodes_items, field_ec_episodes_items_json } = characterChronology;
          const episodesData = JSON.parse(field_ec_episodes_items_json);
          const episodesList = field_ec_episodes_items.split(',').map((i) => i.trim());

          chronologyList = episodesList
            .map((e) => {
              const episode = episodesData.find((ep) => Number(ep.id) === Number(e));
              if (!episode) {
                return;
              }
              const episodeView = JSON.parse(episode.view);
              // debugger;

              const isActive = Number(video) === Number(episodeView[0].nid);

              if (isActive) {
                setVideoTitle(episode.field_ec_title);
              }

              return {
                id: episodeView[0].nid,
                link: `/el-cubo/temporada-1/${episodeView[0].nid}?personaje=${personaje}&modo=${modo}`,
                name: episode.field_ec_title,
                active: isActive,
                image: episodeView[0].field_ec_video_preview_TEMP,
              };
            })
            .filter((i) => i !== undefined);

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

          // console.log({ chronology });
          const characterList = chronology.map((cr) => {
            const name = JSON.parse(cr.field_ec_character_term_json)[0].character_name;
            const character = cr.field_ec_character;

            const id = cr.field_ec_episodes_items.split(',').map((e) => e.trim())[0];
            const episodes = JSON.parse(cr.field_ec_episodes_items_json);
            const episode = episodes.find((e) => e.id === id);
            const episodeView = JSON.parse(episode.view);

            return {
              name,
              active: personaje === character,
              link: `/el-cubo/temporada-1/${episodeView[0].nid}?personaje=${character}&modo=cronologico`,
            };
          });
          setCharacterList(characterList);
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
      <Head>
        <title>{title} - El cubo</title>
      </Head>
      <ElcuboGlobalStyles />
      <MenuPlayerStyle />
      <Container>
        {isFallback ? (
          <div>Loading...</div>
        ) : (
            <>
              <div className="header-top">
                <div className="header-top-inner">
                  <nav className="nav">
                    <a href="#" title="Cambiar de personaje" className="toggle menu-elcubo">
                      <div className="icon-bell">
                        <img src="/images/icon-bell.svg" />
                      </div>
                      <img className="icon-change" src="/images/icon-change-char2.svg" />
                    </a>
                  </nav>
                </div>
              </div>



              <CharacterSelector list={characterList} />
              <FullPlayerWrapper>

                <VideoPlayer
                  showBackButton
                  backLink="/el-cubo/temporada-1/personajes"
                  title={videoTitle}
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
            </>
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
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const chapter = await fetch(`/api/v1/elcubo/season/4731/episode/${params.video}`);

  let srcVideoId = chapter[0] ?.field_ec_asset_id; field_asset_id
  const srcVideo = srcVideoId
    //? `https://rtvcplay-media-content.s3.amazonaws.com/vod-content/${srcVideoId}/${srcVideoId}.m3u8`
    ? `https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:${srcVideoId}.smil/playlist.m3u8`
    : undefined;
  return {
    props: {
      title: chapter[0].title,
      video: params.video,
      srcVideo: srcVideo || null,
      poster: chapter[0] ?.field_ec_video_preview || null,
    }, // will be passed to the page component as props
    revalidate: 900,
  };
};
export default VideoPage;

