import rewards from 'constants/Rewards';
import NameUtils from 'utils/Names';

const setCharacterNodesChrono = (userData, character, current) => {
    const characterName = NameUtils.getCharacterName(character);
    if (characterName) {
        let userNodes = {
            ...rewards.chronological,
            ...userData,
        };
        const characterData = { ...userNodes[characterName] };
        const characterNodes = characterData.viewedNodes;
        const hasViewedCurrent = characterNodes.indexOf(current);
        if (hasViewedCurrent < 0) {
            characterNodes.push(current);
        }
        const sortedViewed = characterNodes.sort();
        userNodes[characterName] = {
            viewedNodes: characterNodes,
        }
        return userNodes;
    }
    return userData;
};

const setCharacterNodesReflexive = (userData, character, current, answers) => {
    const reward = answers && answers.length ? false : true;
    const userNodes = {
        ...rewards.reflexive,
        ...userData,
    };
    const characterData = { ...userNodes[character] };
    let characterNodes = characterData.viewedNodes;
    const currentIndex = characterNodes.indexOf(current);
    if (currentIndex >= 0 && characterNodes.length > currentIndex) {
        characterNodes.splice(currentIndex + 1);
    } else {
        characterNodes.push(current);
    }
    let resultNodes = { ...userNodes };
    resultNodes[character] = {
        reward,
        viewedNodes: [...characterNodes]
    };
    return resultNodes;
};

const setCharacterNodesLabyrinth = (userData, character, currentNode, nextNodes) => {
    const reward = nextNodes && nextNodes.length === 1 ? true : false;
    let userNodes = {
        ...rewards.labyrinth,
        ...userData,
        lastNode: {
            id: currentNode,
            character,
        },
        reward,
    };
    return userNodes;
};

const setCurrentCharacterLabyrinth = (userData, currentCharacter) => {
    let userNodes = {
        ...rewards.labyrinth,
        ...userData,
        currentCharacter: currentCharacter,
    };
    return userNodes;
};

export default {
    setCharacterNodesChrono,
    setCharacterNodesReflexive,
    setCharacterNodesLabyrinth,
    setCurrentCharacterLabyrinth,
};