import React from 'react';
import NextNode from 'components/Labyrinth/NextNode';
import ReplayBtn from 'components/Labyrinth/ReplayBtn';

const NextNodes = ({ nextNodes, bgEndImage, allNodes }) => {

    const nodesData = allNodes.map(node => ({
        nodeId: node.nid,
        characterName: node.field_ec_character_json[0].character_name.split(' ').slice(-1).join(' ').trim().toLowerCase(),
    }));

    return (
        <div className="hero hero-laberinto" style={{ background: `url("${bgEndImage}")`, backgroundSize: 'cover' }}>
            <div className="hero hero-laberinto">
                <div className="copy-cover">
                    {nextNodes ?
                        nextNodes.map(nextNode => {
                            let character = '';
                            nodesData.forEach(node => {
                                if (String(node.nodeId) === nextNode.field_ec_destination) {
                                    character = node.characterName;
                                }
                            });
                            return <NextNode key={nextNode.field_ec_destination} data={nextNode} character={character} />
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