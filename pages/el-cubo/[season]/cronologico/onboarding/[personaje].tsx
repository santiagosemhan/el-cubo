import React, { useState } from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import fetcher from 'libs/fetcher';
import { NavLabyrinthStyles } from 'styles/navlabyrinth.style';
import { OnboardStyles } from 'styles/onboard.styles';
import CharacterOnboarding from '../../../../../components/Chronological/CharacterOnboarding';
import BackToCharacters from '../../../../../components/Labyrinth/BackToCharacters';
import Characters from 'constants/Characters';
import { season1_id } from 'constants/Season';

const CharacterPage = ({ character, node, bgImage, bgImage980 }) => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  React.useEffect(() => {
    const setWindowSize = !window.matchMedia('(min-width: 1024px)').matches;
    setIsSmallScreen(setWindowSize);
  }, []);

  return (
    <AppLayout onlyContent>
      <Head>
        <title>Cronológico - El cubo</title>
      </Head>
      <NavLabyrinthStyles />
      <OnboardStyles />

      <BackToCharacters text={'Volver a elegir personajes'} />
      <CharacterOnboarding node={node} bgImage={isSmallScreen ? bgImage980 : bgImage} />
    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: Characters.map((personaje) => ({ params: { season: 'temporada-1', personaje } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const initialNodes = await fetcher(`/api/v1/elcubo/season/${season1_id}/chrono`);

  const characterNode = initialNodes.filter((node) => {
    const nodeData = JSON.parse(node.field_ec_character_term_json);
    return (
      nodeData[0].character_name
        .split(' ')
        .slice(-1)
        .join(' ')
        .trim()
        .toLowerCase() === context.params.personaje
    );
  });
  const characterJson = JSON.parse(characterNode[0].field_ec_character_term_json);
  const bgImage = characterJson[0].field_ec_image_bg_chrono;
  const bgImage980 = characterJson[0].field_ec_image_bg_chrono_980;

  return {
    props: {
      character: context.params.personaje,
      node: characterNode[0],
      bgImage,
      bgImage980,
    },
  };
};

export default CharacterPage;
