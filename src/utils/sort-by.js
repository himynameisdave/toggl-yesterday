
const sortBy = (list, key) => (a, b) => {
    const aPos = list.indexOf(a[key]);
    const bPos = list.indexOf(b[key]);
    if (aPos < bPos) return -1;
    if (aPos > bPos) return 1;
    return 0;
};

module.exports = sortBy;
