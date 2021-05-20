import React from 'react';

const CharacterIndex = ({ bgImage, character, userData, onContinueClick }) => {

  return (
    <div
      className="app-elcubo onboard"
      style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}
    >
      <div className="hero hero-onboarding onboarding-laberynth">
        <div className="copy-cover">
          <div className="copy">
            {userData && userData.currentCharacter.name === character.name && userData.reward ?
              <div className="winner">
                <p className="p-winner">
                  <span className="copy-phrase">Ya lograste la recompensa iniciando con este personaje.</span>
                </p>
                <div className="col-2">
                  <div className="col-left">
                    <a className="button-login cyan-dark button-quit" href={`/el-cubo/temporada-1/laberinto/recompensa/${userData.currentCharacter.name}`}>
                      Ver recompensa de nuevo
                  </a>
                  </div>
                  <div className="col-right">
                    <div className="cover-link">
                      <a href="#" onClick={onContinueClick} className="button-cyan">
                        <span>Comenzar</span>
                        <img src="/images/icon-arrow-init.svg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              :
              userData && userData.currentCharacter.name === character.name && userData.lastNode.id && !userData.reward ?
                <div className="winner">
                  <p>
                    ¡Sigue tu intuición!
                    Al completar cada personaje, podrás acceder a la mente de su creador.
                  </p>
                  <div className="col-2">
                    <div className="col-left">
                      <a className="button-login cyan-dark button-quit" href={`/el-cubo/temporada-1/laberinto/${userData.lastNode.character}/${userData.lastNode.id}`}>
                        Continuar donde quedé
                    </a>
                    </div>
                    <div className="col-right">
                      <div className="cover-link">
                        <a href="#" onClick={onContinueClick} className="button-cyan">
                          <span>Comenzar</span>
                          <img src="/images/icon-arrow-init.svg" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <p>
                    ¡Sigue tu intuición!
                    Al completar cada personaje, podrás acceder a la mente de su creador.
                  </p>
                  <div className="cover-link">
                    <a href="#" onClick={onContinueClick} className="button-cyan">
                      <span>Comenzar</span>
                      <img src="/images/icon-arrow-init.svg" />
                    </a>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterIndex;
