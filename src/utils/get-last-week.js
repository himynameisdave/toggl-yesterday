const moment = require(`moment`);


const getLastWeek = () => {
    //  Starts from last saturday morning for now. Should display this date IMO
    const LAST_SATURDAY_MORNING = moment()
                                    .startOf(`week`)
                                    .subtract(1, `days`)
                                    .startOf(`day`)
                                    .toISOString();
    return {
        START_DATE: LAST_SATURDAY_MORNING,
        END_DATE: moment().startOf(`day`).toISOString(),
    };
};

module.exports = getLastWeek;
