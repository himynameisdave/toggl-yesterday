require('dotenv').config();
const moment = require('moment');
const TogglClient = require('toggl-api');
const Toggl = new TogglClient({ apiToken: process.env.API_TOKEN });

//  START OF THE DAY, YESTERDAY
const START_DATE = moment().subtract(1, 'days').startOf('day').toISOString();
const END_DATE = moment().startOf('day').toISOString();

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

const filterWhitelist = entry => PROJECTS_WHITELIST.indexOf(entry.pid) > -1;
const dedupe = (acc, entry) => {
    if (acc.map(e => e.description).indexOf(entry.description) === -1) acc.push(entry);
    return acc;
};
const sortFunction = (a, b) => {
    const aPos = PROJECTS_WHITELIST.indexOf(a.pid);
    const bPos = PROJECTS_WHITELIST.indexOf(b.pid);
    if (aPos < bPos) return -1;
    if (aPos > bPos) return 1;
    return 0;
};
const reduceToStr = (acc, entry) => {
    acc += `${PROJECTS_EMOJI[entry.pid]} ${entry.description}\n`;
    return acc;
};


Toggl.getTimeEntries(START_DATE, END_DATE, (err, timeEntries) => {
  if (err) {
      console.error(err);
      return process.exit(1);
  }

  const datText = timeEntries
                        .filter(filterWhitelist)
                        .reduce(dedupe, [])
                        .sort(sortFunction)
                        .reduce(reduceToStr, '');


  console.log(datText);
});
