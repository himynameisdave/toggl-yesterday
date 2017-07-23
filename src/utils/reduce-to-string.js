

const reduceToStr = (emojiMap, padding = ``) => (acc, entry) => {
    acc += `${padding}${emojiMap[entry.pid]} ${entry.description}\n`;
    return acc;
};

module.exports = reduceToStr;
