//  Reduces the emojimap to a single string
const reduceToPostableString = (emojiMap, padding = ``) => (acc, entry) => `${acc}${padding}${emojiMap[entry.pid]} ${entry.description}\n`;

export default reduceToPostableString;
