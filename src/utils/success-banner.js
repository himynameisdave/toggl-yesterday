const clearConsole = require('clear');
const complimentThePettyHuman = require('./compliment-the-petty-human.js')

const BANNER = `
   C O P I E D    T O    T H E    C L I P B O A R D:`;
const robot = `
   ___T_
  | o o |
  |__-__|   ${complimentThePettyHuman()}
  /| []|\\
()/|___|\\()
   |_|_|
   /_|_\\
`;


const successBanner = consoleText => () => {
    clearConsole();
    console.log(
        `${BANNER}\n\n${consoleText}${robot}\n`
    );
};

module.exports = successBanner;
