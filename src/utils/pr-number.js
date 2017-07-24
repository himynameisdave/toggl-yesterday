//  Will return the PR number of a given string
//  Returns a string like '#1234'
//  Should return null if there is no PR number

export const getPRNumber = string => {
    const PR = string.match(/(#([0-9]))\w+/g) || [null];
    return [...PR].pop();
};

export const setPRNumber = e => {
    const pr = getPRNumber(e.description);
    return {
        ...e,
        pr,
        prNumber: pr !== null ? parseInt(pr.substring(1, pr.length)) : -1,
    };
};
