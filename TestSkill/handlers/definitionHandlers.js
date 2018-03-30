const Alexa = require('alexa-sdk');
const constants = require('./constants/constants');
const aiFacts = require('./aiFacts/aiFacts');

const definitionHandlers = Alexa.CreateStateHandler(constants.states.DEFINITIONS, {
    
});

module.exports = definitionHandlers;
