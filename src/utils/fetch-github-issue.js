import GitHub from 'github';
// import { SG_REPO_ID } from '../constants/github.js';
//  Create & auth GitHub API
const githubAPI = new GitHub();
githubAPI.authenticate({
    type: `oauth`,
    token: process.env.GITHUB_API_TOKEN,
});

const fetchGitHubIssueId = (pr) => {
    const FETCH_CONFIG = {
        owner: `7Geese`,
        repo: `7Geese`,
        number: pr,
    };
    return new Promise((res, rej) => {
        githubAPI.pullRequests.get(FETCH_CONFIG)
            .then(response => {
                res(response.data.id);
            })
            .catch(() => {
                githubAPI.issues.get(FETCH_CONFIG)
                    .then(response => {
                        res(response.data.id);
                    })
                    .catch(rej);
            });
    });
};


export default fetchGitHubIssueId;
