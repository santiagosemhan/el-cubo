import React from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import { RewardReflexiveStyles } from 'styles/rewardReflexive.style';
import { NavRewardStyles } from 'styles/navReward.style';
import BackToCharacters from 'components/Labyrinth/BackToCharacters';
import fetcher from 'libs/fetcher';
import UserService from 'services/User';

const ReflexiveReward = ({ rewards }) => {

  return (
    <AppLayout onlyContent>
      <Head>
        <title>Reflexivo - El cubo</title>
      </Head>
      <RewardReflexiveStyles />
      <NavRewardStyles />

      <BackToCharacters text={'Volver al inicio'} />

      <img src="/images/recompensa/bg.jpg" className="bg-recompensa" />

      <div className="app-elcubo recompensa">
        <div>
          <h1 className="title-recompensa">¡Lo Lograste!</h1>
          <p className="desc-recompensa">Como premio, te obsequiamos este informe personalizado.
                <br /> ¿Te suena?</p>
          <div className="p-informe">
            {rewards ?
              rewards.map((reward, index) => <p key={`reward_${index}`}>{reward}</p>)
              :
              null
            }
          </div>
          <div className="cover-link">
            <a href={`/el-cubo/temporada-1/personajes`} className="button-cyan">
              <span>Volver a la experiencia</span>
              <img src="/images/icon-arrow-init.svg" />
            </a>
          </div>
        </div>
      </div>

    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { season: 'temporada-1' } }],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { data } = await UserService.getMe();
  const readNodesString = data.elcubo_reflexivo;
  const readNodesJSON = JSON.parse(readNodesString);
  const nodes = await Promise.all(readNodesJSON.map(node =>
    fetcher(`/api/v1/elcubo/season/4731/reflexive/${node}`)
  ));

  const rewards = nodes.filter(node => Array.isArray(node)).map(reward => reward[0].field_ec_reward_text);

  return {
    props: {
      rewards,
    },
  };
};

export default ReflexiveReward;
