import React from 'react';

const NextNode = ({ data, character }) => {

    const {
        field_ec_destination,
        field_ec_text_point,
        field_ec_x_point,
        field_ec_y_point
    } = data;

    console.log('data', data);
    const nextNodeLink = `/el-cubo/temporada-1/laberinto/${character}/${field_ec_destination}`;

    return (
        <div className="cover-selector" style={{ left: `${field_ec_x_point}vw`, bottom: `${field_ec_y_point}vh` }}>
            <div className="cover-selector">
                <div className="cover-pulse">
                    <a className="pulse" href={nextNodeLink} data-rel={nextNodeLink}></a>
                </div>
                <span className="pulse-text">{field_ec_text_point}</span>
            </div>
        </div>
    );
};

export default NextNode;