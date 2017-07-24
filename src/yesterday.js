//  External Dep
import clipboard from 'copy-paste';
//  Hardcoded for now....
import PROJECTS from './constants/projects.js';
const getProjectsEmoji = type => PROJECTS.reduce((acc, project) => {
    acc[project.id] = project[type];
    return acc;
}, {});
//  Constants
const PROJECTS_WHITELIST = PROJECTS.map(project => project.id);
const PROJECTS_SLACK_EMOJI = getProjectsEmoji(`slackEmoji`);
const PROJECTS_EMOJI = getProjectsEmoji(`emoji`);

//  Utils/helpers
import dedupe from './utils/dedupe.js';
import fetchToggl from './utils/fetch-toggl.js';
import getLastDay from './utils/get-last-day.js';
import reduceToPostableString from './utils/reduce-to-postable-string.js';
import successBanner from './utils/success-banner.js';
const sortByProjectOrder = require(`./utils/sort-by.js`)(PROJECTS_WHITELIST, `pid`);
const whitelistedProjectsOnly = require(`./utils/whitelist-only.js`)(PROJECTS_WHITELIST, `pid`);


//  Main script
const yesterday = () => {
    const dedupeDescriptions = dedupe(`description`);
    //  Run our fetch
    fetchToggl(getLastDay())
        .then(entries => entries
            .filter(whitelistedProjectsOnly)
            .reduce(dedupeDescriptions, [])
            .sort(sortByProjectOrder)
        )
        .then(entries => {
            const slackText = entries.reduce(reduceToPostableString(PROJECTS_SLACK_EMOJI, ``), ``);
            const consoleText = entries.reduce(reduceToPostableString(PROJECTS_EMOJI, `   =====>   `), ``);
            clipboard.copy(slackText, successBanner(consoleText));
        })
        .catch(err => {
            console.error(err);
            return process.exit(1);
        });
};

export default yesterday;
