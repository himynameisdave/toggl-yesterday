//  Hardcoded for now....
const PROJECTS = require(`./constants/projects.js`);
const getProjectsEmoji = type => PROJECTS.reduce((acc, project) => {
    acc[project.id] = project[type];
    return acc;
}, {});
//  Constants
const PROJECTS_WHITELIST = PROJECTS.map(project => project.id);
const PROJECTS_SLACK_EMOJI = getProjectsEmoji(`slackEmoji`);
const PROJECTS_EMOJI = getProjectsEmoji(`emoji`);
//  External Dep
const clipboard = require(`copy-paste`);
//  Utils/helpers
const dedupeDescriptions = require(`./utils/dedupe.js`)(`description`);
const fetchToggl = require(`./utils/fetch-toggl.js`);
const getLastDay = require(`./utils/get-last-day.js`);
const reduceToPostableString = require(`./utils/reduce-to-string.js`);
const sortByProjectOrder = require(`./utils/sort-by.js`)(PROJECTS_WHITELIST, `pid`);
const successBanner = require(`./utils/success-banner.js`);
const whitelistedProjectsOnly = require(`./utils/whitelist-only.js`)(PROJECTS_WHITELIST, `pid`);

//  Main script
const main = () => {
    //  Run our fetch
    fetchToggl(getLastDay())
        .then(entries => entries
            .filter(whitelistedProjectsOnly)
            .reduce(dedupeDescriptions, [])
            .sort(sortByProjectOrder),
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

module.exports = main;
