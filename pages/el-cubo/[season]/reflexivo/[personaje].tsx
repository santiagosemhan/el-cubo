import React, { useState } from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import fetcher from 'libs/fetcher';
import { ReflexiveStyles } from 'styles/reflexive.style';
import { NavReflexiveStyles } from 'styles/navreflexive.style';
import CharacterIndex from '../../../../components/Reflexive/CharacterIndex';
import BackToCharacters from '../../../../components/Labyrinth/BackToCharacters';
import AuthService from 'services/Auth';
import UserService from 'services/User';

const CharacterPage = ({ character, node, bgImage, episodeData }) => {

  const isLoggedIn = AuthService.isLoggedIn();

  const updateUserOnViewedAll = async () => {
    try {
      const { data } = await UserService.getMe();
      const readNodesJSON = [node.nid];
      await UserService.update(data.id, {
        field_ec_reflexive_data_json: {
          value: JSON.stringify(readNodesJSON)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout onlyContent>
      <Head>
        <title>Reflexivo - El cubo</title>
        <link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />
      </Head>
      <ReflexiveStyles />
      <NavReflexiveStyles />

      <BackToCharacters text={'Volver al inicio'} />
      <CharacterIndex
        character={character}
        node={node}
        bgImage={bgImage}
        episodeData={episodeData}
        onViewedAll={updateUserOnViewedAll}
      />
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
  const initialNodes = await fetcher('/api/v1/elcubo/season/4731/reflexive');

  const characterNode = initialNodes.filter((node) => {
    const nodeData = JSON.parse(node.field_ec_character_json);
    return (
      nodeData[0].character_name
        .split(' ')
        .slice(-1)
        .join(' ')
        .trim()
        .toLowerCase() === context.params.personaje
    );
  });

  const characterJson = JSON.parse(characterNode[0].field_ec_character_json);
  const episodeData = JSON.parse(characterNode[0].field_ec_episode_json);
  const bgImage = characterJson[0].field_ec_image_bg_reflex;

  return {
    props: {
      character: context.params.personaje,
      episodeData: episodeData[0],
      node: characterNode[0],
      bgImage,
    },
  };
};

export default CharacterPage;
