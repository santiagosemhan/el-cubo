import React from 'react';

const BackToCharacters = props => {

    return (
        <div className="header-top">
            <div className="header-top-inner">
                <nav className="nav">
                    <a href="/el-cubo/temporada-1/personajes" className="back-to-season">
                        <img src="/images/laberinto/icon-arrow-back.svg" />
                        <span>Volver a elegir personajes</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default BackToCharacters;