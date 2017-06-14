const moment = require('moment');

const getDates = () => {
    const MONDAY = 1;
    let START_DATE = moment().subtract(1, 'days').startOf('day').toISOString();
    //   If it's a Monday, grab all the entries that I've done since Friday morning
    if (moment().day() === MONDAY) {
        START_DATE = moment().subtract(3, 'days').startOf('day').toISOString();
    }
    return {
        START_DATE,
        END_DATE: moment().startOf('day').toISOString(),
    };
};

module.exports = getDates;
