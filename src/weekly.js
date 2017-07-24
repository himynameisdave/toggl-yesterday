import dedupe from './utils/dedupe.js';
import fetchToggl from './utils/fetch-toggl.js';
// import fetchZenHub from './utils/fetch-zenhub.js';
import fetchGitHubIssueId from './utils/fetch-github-issue.js';
import filterWeeklyProjects from './utils/filter-weekly-projects.js';
import { setPRNumber } from './utils/pr-number.js';
// const getLastWeek = require(`./utils/get-last-week.js`);
//  TODO: remove this
const moment = require(`moment`);

const weekly = () => {
    // console.log(`dem weekly`, getLastWeek());

    //  TODO: Just for testing purposes, remoe also
    const MOCK_DATES = {
        START_DATE: moment()
                            .subtract(1, `days`)
                            .startOf(`week`)
                            .subtract(1, `days`)
                            .startOf(`week`)
                            .startOf(`day`)
                            .toISOString(),
        END_DATE: moment().startOf(`day`).toISOString(),
    };

    const noNullPRs = e => e.pr !== null;
    const dedupePRs = dedupe(`pr`);
    const addGHFetchPromise = e => ({ ...e, fetchGitHubIssueId: fetchGitHubIssueId.bind(null, e.prNumber) });
    const composedReduceEntries = entries => entries.map(setPRNumber)
                                                    .filter(noNullPRs)
                                                    .reduce(dedupePRs, [])
                                                    .map(addGHFetchPromise);

    const getAllGitHubIds = (fetchPromises) => Promise.all(fetchPromises.map(p => p.catch(() => null)));
    const fetchAllGitHubIds = (entries) => new Promise((res, rej) => {
        const _entries = { ...entries };
        Promise.all([
            getAllGitHubIds(entries.implemented.map(e => e.fetchGitHubIssueId())),
            getAllGitHubIds(entries.cr.map(e => e.fetchGitHubIssueId())),
        ])
        .then(githubIds => {
            _entries.implemented = _entries.implemented.map((entry, index) => ({ ...entry, id: githubIds[0][index] }));
            _entries.cr = _entries.cr.map((entry, index) => ({ ...entry, id: githubIds[1][index] }));
            res(_entries);
        })
        .catch(rej);
    });

    //  get last 7 days of toggl reports
    // fetchToggl(getLastWeek())
    fetchToggl(MOCK_DATES)
        .then(filterWeeklyProjects)
        .then(entries => ({
            implemented: composedReduceEntries(entries.implemented),
            cr: composedReduceEntries(entries.cr),
        }))
        .then(fetchAllGitHubIds)
        .then(entries => {
            console.log(entries);
        })
        .catch((e) => {
            console.log(e);
            console.error(`\nC A T A S T R O P H I C  <x>  E R R O R\n`);
            process.exit(1);
        });

    //  for every one of building new tickets and fixing CR, put them into one bucket
    //  For every doing CR one,

    //  Generate a URL for each #1234 PR number

    //  Display both lists of URLs into the console

    //
};

export default weekly;
