
const dedupe = (uniqueKey) => (acc, entry) => {
    if (acc.map(e => e[uniqueKey]).indexOf(entry[uniqueKey]) === -1) acc.push(entry);
    return acc;
};


export default dedupe;
