

const main = () => {
    //  Hardcoded for now....
    const PROJECTS_WHITELIST = [
        30002732, // <- BUILDING, NEW TICKET
        34208753, // <- ADDRESSING CR FEEDBACK
        29996017, // <- DOING CR
        43940771, // <- MEETINGS
    ];
    const PROJECTS_EMOJI = {
        30002732: ':construction_worker:', // <- BUILDING, NEW TICKET
        34208753: ':construction_worker:', // <- ADDRESSING CR FEEDBACK
        29996017: ':sleuth_or_spy:',       // <- DOING CR
        43940771: ':man-woman-girl-boy:',  // <- MEETINGS
    }
    const fetchToggl = require('./utils/fetch-toggl.js');
    const getDates = require('./utils/get-dates.js');
    const whitelistedProjectsOnly = require('./utils/whitelist-only.js')(PROJECTS_WHITELIST, 'pid');
    const dedupeDescriptions = require('./utils/dedupe.js')('description');
    const sortByProjectOrder = require('./utils/sort-by.js')(PROJECTS_WHITELIST, 'pid');
    const reduceToPostableString = require('./utils/reduce-to-string.js')(PROJECTS_EMOJI);
    const DATES = getDates();

    fetchToggl(DATES.START_DATE, DATES.END_DATE)
        .then(entries => {
            const datText = entries
                                  .filter(whitelistedProjectsOnly)
                                  .reduce(dedupeDescriptions, [])
                                  .sort(sortByProjectOrder)
                                  .reduce(reduceToPostableString, '');


            console.log(datText);
        })
        .catch(err => {
            console.error(err);
            return process.exit(1);
        });
};

module.exports = main;
