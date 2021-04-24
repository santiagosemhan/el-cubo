import React from 'react';

const CharacterIndex = ({ character, node, bgImage }) => {
  // TODO: Add field_ec_copy_lab;
  const nextPageLink = `/el-cubo/temporada-1/laberinto/${character}/${node}`;

  return (
    <div
      className="app-elcubo onboard"
      style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}
    >
      <div className="hero hero-onboarding onboarding-laberynth">
        <div className="copy-cover">
          <div className="copy">
            <p>
              ¡Sigue tu intuición!
              Al completar cada personaje, podrás acceder a la mente de su creador.
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

export default CharacterIndex;
