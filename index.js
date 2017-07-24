#! /usr/bin/env node

import './env.js';
import yesterday from './src/yesterday.js';
import weekly from './src/weekly.js';


//  Determine if we are generating a weekly report yet or just the "yesterday"
if (process.argv[2] === `weekly`) {
    weekly();
} else {
    yesterday();
}
