import React from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';

import fetcher from 'libs/fetcher';

import { NavLabyrinthStyles } from 'styles/navlabyrinth.style';
import { OnboardStyles } from 'styles/onboard.styles';

import CharacterIndex from '../../../../components/Labyrinth/CharacterIndex';
import BackToCharacters from '../../../../components/Labyrinth/BackToCharacters';

const CharacterPage = ({ character, node, bgImage }) => {
  return (
    <AppLayout onlyContent>
      <Head>
        <title>Laberinto - El cubo</title>
      </Head>
      <NavLabyrinthStyles />
      <OnboardStyles />

      <BackToCharacters text={'Volver a elegir personajes'} />
      <CharacterIndex character={character} node={node} bgImage={bgImage} />
    </AppLayout>
  );
};

export async function getStaticPaths() {
  // TODO: Cargar desde la api los personajes
  const personajes = ['alba', 'carey', 'marina', 'mercado', 'elvira', 'sales'];
  return {
    paths: personajes.map((personaje) => ({ params: { season: 'temporada-1', personaje } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const initialNodes = await fetcher('/api/v1/elcubo/season/4731/labyrinth');

  const characterNode = initialNodes.filter((node) => {
    const nodeData = JSON.parse(node.character_json);
    return (
      nodeData[0].character_name
        .split(' ')
        .slice(-1)
        .join(' ')
        .trim()
        .toLowerCase() === context.params.personaje
    );
  });

  const characterJson = JSON.parse(characterNode[0].character_json);
  const bgImage = characterJson[0].field_ec_image_bg_lab;

  return {
    props: {
      character: context.params.personaje,
      node: characterNode[0].node_labyrinth_id,
      bgImage,
    },
  };
};

export default CharacterPage;
