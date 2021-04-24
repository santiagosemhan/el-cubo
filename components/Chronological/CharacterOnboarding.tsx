import React from 'react';

const CharacterOnboarding = ({ node, bgImage }) => {

  const episodes = node.field_ec_episodes_items.split(',').map((ep) => ep.trim());
  const episodesItems = JSON.parse(node.field_ec_episodes_items_json);
  const episode = episodesItems.find((ep) => ep.id === episodes[0]);
  const episodeView = JSON.parse(episode.view);
  const nextPageLink = `/el-cubo/temporada-1/cronologico/${episodeView[0].nid}?personaje=${node.field_ec_character}&modo=cronologico`;

  return (
    <div
      className="app-elcubo onboard"
      style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}
    >
      <div className="hero hero-onboarding onboarding-chrono">
        <div className="copy-cover">
          <div className="copy">
            <p>
              <span className="copy-phrase">Completa esta cronología y obtén acceso privilegiado al gran mapa de la historia</span>
            </p>

            <p class="p-winner">
              Ya lograste la recompensa asociada a este personaje.<br />
              <a href="">Ver recompensa de nuevo</a>
            </p>

            <div className="cover-link">
              <a href={nextPageLink} className="button-cyan">
                <span>Continuar</span>
                <img src="/images/icon-arrow-init.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterOnboarding;
