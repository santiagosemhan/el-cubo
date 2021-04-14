import React from 'react';

const CharacterIndex = ({ character, node, bgImage }) => {


    // TODO: Add field_ec_copy_lab;
    const nextPageLink = `/el-cubo/temporada-1/laberinto/${character}/${node}`

    return (
        <div className="app-elcubo onboard" style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}>
            <div className="hero hero-onboarding">
                <div className="copy-cover">
                    <div className="copy">
                        <p>
                            <span className="copy-phrase">¿Cuánto Poder tiene para ti la verdad?</span>
                            <br /> Navega este personaje y contesta las preguntas para recibir tu concepto
                        </p>
                        <div className="cover-link">
                            <a href={nextPageLink} className="button-cyan">
                                <span>Continuar</span>
                                <img src="/images/laberinto/icon-arrow-init.svg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterIndex;