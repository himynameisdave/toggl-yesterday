const clearConsole = require('clear');

const BANNER = `
   ___T_
  | o o |  C O P I E D
  |__-__|    T H E
  /| []|\\     F O L L O W I N G
()/|___|\\()     T O
   |_|_|           T H E
   /_|_\\            C L I P B O A R D:`;


const successBanner = consoleText => () => {
    clearConsole();
    console.log(
        `${BANNER}\n\n${consoleText}`
    );
};

module.exports = successBanner;
