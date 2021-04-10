import React from 'react';

const ReplayBtn = () => {

    return (
        <div className="flex-container column">
            <div className="flex-item">&nbsp;</div>
            <div className="flex-item">
                <div className="icon-cover icon-replay toggle">
                    <img src="/images/laberinto/replay-reflexivo.svg" />
                </div>
            </div>
            <div className="flex-item">
                <div className="copy">
                    <p>Lorem ipsumulis,<br />ultricies ante a</p>
                    <div className="cover-link">
                        <a id="link-next" href="#" className="button-cyan">
                            <span>Continuar</span>
                            <img src="/images/laberinto/icon-arrow-init.svg" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplayBtn;