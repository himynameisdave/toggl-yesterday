const moment = require('moment');

const getDates = () => ({
    START_DATE: moment().subtract(1, 'days').startOf('day').toISOString(),
    END_DATE: moment().startOf('day').toISOString(),
});

module.exports = getDates;
