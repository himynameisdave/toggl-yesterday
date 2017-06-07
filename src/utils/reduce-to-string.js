

const reduceToStr = emojiMap => (acc, entry) => {
    acc += `${emojiMap[entry.pid]} ${entry.description}\n`;
    return acc;
};

module.exports = reduceToStr;
