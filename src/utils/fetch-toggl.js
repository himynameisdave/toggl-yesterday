import TogglClient from 'toggl-api';
const Toggl = new TogglClient({ apiToken: process.env.TOGGL_API_TOKEN });


const fetchToggl = ({ START_DATE, END_DATE }) => new Promise((res, rej) => {
    Toggl.getTimeEntries(START_DATE, END_DATE, (err, timeEntries) => {
        if (err) return rej(err);
        return res(timeEntries);
    });
});


export default fetchToggl;
