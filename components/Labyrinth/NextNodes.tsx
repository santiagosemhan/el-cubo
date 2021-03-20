import React from 'react';
import NextNode from 'components/Labyrinth/NextNode';
import ReplayBtn from 'components/Labyrinth/ReplayBtn';

const NextNodes = ({ nextNodes, bgEndImage }) => {

    console.log('NEXT NODESSSSSSS', nextNodes);

    const nextNodesInfo = [
        {
            left: '32vw',
            bottom: '35vh',
            href: 'asd1',
            dataRel: 'asd2',
            title: 'Fué un abuso',
        },
        {
            left: '55.1vw',
            bottom: '35vh',
            href: '/asd3',
            dataRel: '/asd4',
            title: 'Fué profesional',
        },
    ];

    return (
        // <div className="hero hero-laberinto" style={{ background: `url("/laberinto/img/alba/ALBA-1.jpg")`, backgroundSize: 'cover' }}>
        <div className="hero hero-laberinto" style={{ background: `url("${bgEndImage}")`, backgroundSize: 'cover' }}>

            <div className="hero hero-laberinto">
                <div className="copy-cover">
                    {nextNodes ?
                        nextNodes.map(nextNode => (
                            <NextNode data={nextNode} />
                        ))
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