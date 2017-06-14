const COMPLIMENTS = [
    `Have a swell day`,
    `Get workin'`,
    `Wow you're cool`,
    `Go kick some ass`,
    `Vamonos muchachos`,
    `Rise and grind`,
    `Get at it`,
    `Stop SLACKing off`,
    `Holla atcha boi`,
    `Hope it's another productive day`,
    `Say word, get at that work`,
    `On a scale of one to awesome, you're a human`,
    `I can't do your work for you`,
    `Go tell computers what to do`,
    `Build that shit`,
    `Bump the lamp`,
    `Go build some software`,
    `Good devs ship stuff`,
    `Be a linchpin`,
    `Dayyyumn son, it's another beautiful day`
].map(compliment => `${compliment}, human!`);

const complimentThePettyHuman = () => {
    return COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
};


module.exports = complimentThePettyHuman;
