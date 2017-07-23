// import PROJECTS from './constants/projects.js';
import fetchToggl from './utils/fetch-toggl.js';
import filterWeeklyProjects from './utils/filter-weekly-projects.js';
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
                            .startOf(`day`)
                            .toISOString(),
        END_DATE: moment().startOf(`day`).toISOString(),
    };


    //  get last 7 days of toggl reports
    // fetchToggl(getLastWeek())
    fetchToggl(MOCK_DATES)
        .then(entries => {
            console.log(filterWeeklyProjects(entries));
            return entries
        })
        // .then(entries => {
        //     // console.log(entries);
        // });

    //  for every one of building new tickets and fixing CR, put them into one bucket
    //  For every doing CR one,

    //  Generate a URL for each #1234 PR number

    //  Display both lists of URLs into the console

    //
};

export default weekly;
