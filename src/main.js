//  Main script
const main = () => {
    //  Hardcoded for now....
    const PROJECTS = require('./constants/projects.js');
    const getProjectsEmoji = type => PROJECTS.reduce((acc, project) => {
                                            acc[project.id] = project[type];
                                            return acc;
                                        }, {});
    //  Constants
    const PROJECTS_WHITELIST = PROJECTS.map(project => project.id);
    const PROJECTS_SLACK_EMOJI = getProjectsEmoji('slackEmoji');
    const PROJECTS_EMOJI = getProjectsEmoji('emoji');
    //  External Deps
    const clearConsole = require('clear');
    const clipboard = require('copy-paste');
    //  Utils/helpers
    const fetchToggl = require('./utils/fetch-toggl.js');
    const getDates = require('./utils/get-dates.js');
    const whitelistedProjectsOnly = require('./utils/whitelist-only.js')(PROJECTS_WHITELIST, 'pid');
    const dedupeDescriptions = require('./utils/dedupe.js')('description');
    const sortByProjectOrder = require('./utils/sort-by.js')(PROJECTS_WHITELIST, 'pid');
    const reduceToPostableString = require('./utils/reduce-to-string.js');

    //  Run our fetch
    fetchToggl(getDates())
        .then(entries => entries
            .filter(whitelistedProjectsOnly)
            .reduce(dedupeDescriptions, [])
            .sort(sortByProjectOrder)
        )
        .then(entries => {
            const slackText = entries.reduce(reduceToPostableString(PROJECTS_SLACK_EMOJI), '')
            const consoleText = entries.reduce(reduceToPostableString(PROJECTS_EMOJI), '')
            clipboard.copy(slackText, () => {
                clearConsole();
                console.log(`\n\n${consoleText}\n👌 👌 👌 COPIED TO THE CLIPBOARD WITH GREEEEAT SUCCESS! 👌 👌 👌\n`);
            });
        })
        .catch(err => {
            console.error(err);
            return process.exit(1);
        });
};

module.exports = main;
