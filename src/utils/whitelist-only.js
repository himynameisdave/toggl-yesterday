
const whitelistOnly = (whitelist, key) => entry => !!(whitelist.indexOf(entry[key]) > -1);

module.exports = whitelistOnly;
