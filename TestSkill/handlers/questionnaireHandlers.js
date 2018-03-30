const Alexa = require('alexa-sdk');
const constants = require('constants');
const aiQuestions = require('./aiQuestions/aiQuestions');

const questionnaireHandlers = Alexa.CreateStateHandler(constants.states.QUESTIONNAIRE , {
    
});

module.exports = questionnaireHandlers;
