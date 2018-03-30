module.exports = {
    enterState: {
        prompt: "firsties",
        reprompt: (fact) => `secondsies ${fact}`
    },
    factsState: {
        prompt: "firsties",
        reprompt: (fact) => `secondsies ${fact}`
    }
};
