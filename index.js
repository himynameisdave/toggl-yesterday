#! /usr/bin/env node

require('dotenv').config();
const main = require(`./src/main.js`);
const weekly = require(`./src/weekly.js`);

//  Determine if we are generating a weekly report yet or not
if (process.argv[2] === 'weekly') {
    weekly();
} else {
    main();
}
