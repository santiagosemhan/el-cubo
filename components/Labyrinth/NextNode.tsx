import React from 'react';

const NextNode = ({ data }) => {

    const {
        href = '/asd1',
        dataRel = '/asd1',
        field_ec_text_point,
        field_ec_x_point,
        field_ec_y_point
    } = data;

    console.log('DATA DENTRO DE NEXTNODE', data);

    return (
        <div className="cover-selector" key={href} style={{ left: `${field_ec_x_point}vw`, bottom: `${field_ec_y_point}vh` }}>
            <div className="cover-selector">
                <div className="cover-pulse">
                    <a className="pulse" href={href} data-rel={dataRel}></a>
                </div>
                <span className="pulse-text">{field_ec_text_point}</span>
            </div>
        </div>
    );
};

export default NextNode;