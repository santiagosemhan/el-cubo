const cleanReflexive = (nodes, current) => {
    let initialNodes = [...nodes];
    const currentIndex = initialNodes.indexOf(current);
    if (currentIndex >= 0 && initialNodes.length > currentIndex) {
        initialNodes.splice(currentIndex + 1);
    } else {
        initialNodes.push(current);
    }
    return initialNodes;
};

export default {
    cleanReflexive,
};