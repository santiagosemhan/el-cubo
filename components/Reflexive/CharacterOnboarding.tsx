import React from 'react';

const CharacterOnboarding = ({ character, node, bgImage }) => {
  // TODO: Add field_ec_copy_lab;
  const nextPageLink = `/el-cubo/temporada-1/reflexivo/${character}`;

  return (
    <div
      className="app-elcubo onboard"
      style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}
    >
      <div className="hero hero-onboarding onboarding-reflexive">
        <div className="copy-cover">
          <div className="copy">
            <p>
              <span className="copy-phrase">¿Cuánto Poder tiene para ti la verdad?</span>
              <br /> Navega este personaje y contesta las preguntas para recibir tu concepto
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
