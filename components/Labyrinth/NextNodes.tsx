import React from 'react';
import NextNode from 'components/Labyrinth/NextNode';
import ReplayBtn from 'components/Labyrinth/ReplayBtn';

const NextNodes = ({ nextNodes, bgEndImage, opacity }) => {

    const bgImageOpacity = opacity / 100;

    return (
        <div className="hero hero-laberinto" style={{ background: `url("${bgEndImage}")`, backgroundSize: 'cover', }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: `rgba(0,0,0,${bgImageOpacity})` }}></div>

            <div className="hero hero-laberinto">
                <div className="copy-cover">
                    {nextNodes ?
                        nextNodes.map(nextNode => {
                            return <NextNode key={nextNode.field_ec_destination} data={nextNode} />
                        })
                        :
                        null
                    }
                    <ReplayBtn />
                </div>
            </div>
        </div>
    );
};

export default NextNodes;