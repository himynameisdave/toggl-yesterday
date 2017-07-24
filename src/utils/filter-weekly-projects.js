import PROJECTS from '../constants/projects.js';
const IMPLEMENTED_PROJECTS = PROJECTS.reduce((acc, p) => { // eslint-disable-line arrow-body-style
    return p.project === `BUILDING` || p.project === `CR_FEEDBACK` ? acc.concat([p.id]) : acc;
}, []);
const CR_PROJECTS = PROJECTS.reduce((acc, p) => (p.project === `DOING_CR`) ? acc.concat([p.id]) : acc, []);


const filterWeeklyProjects = (entries) => {
    const INITIAL_STATE = {
        implemented: [],
        cr: [],
    };
    return entries.reduce((acc, entry) => {
        if (IMPLEMENTED_PROJECTS.includes(entry.pid)) return { ...acc, implemented: acc.implemented.concat({ description: entry.description }) };
        if (CR_PROJECTS.includes(entry.pid)) return { ...acc, cr: acc.cr.concat({ description: entry.description }) };
        return acc;
    }, INITIAL_STATE);
};

export default filterWeeklyProjects;
