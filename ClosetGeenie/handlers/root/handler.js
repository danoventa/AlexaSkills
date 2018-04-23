const Alexa = require('alexa-sdk');
const constants = require('./constants');
const prompts = require('./prompts');
const root = require('../root');


const LASTREQUEST = 'lastRequestedOffer';
const INTNET = 'aws.intent';
const OFFERINGS = Object.keys(awsDetails);
const OFFERINGSSPEECH = speechHelper.SpeakPrettyFromArray(OFFERINGS);
const OFFERINGEXAMPLES = speechHelper.ListOutExamplesFromArray(OFFERINGS);

const intents = {
    'GiveAWSDetails':'GiveAWSDetails',
    'ExpandAWSDetails':'ExpandAWSDetails',
    'EnterState':'EnterState',
    'HelpIntent':'HelpIntent',
    'CatchState':'CatchState'
};

module.exports = Alexa.CreateStateHandler(
    constants.states.AWS,
    Object.assign({}, genericHandlers, {
        'LaunchRequest': function() {
            this.emit(':ask', "Just keeping the session open");
            this.emit(':responseReady');
        },

        'RootRequest': function() {
            this.emit(":tell", "Congrats, you've success!");
        },

        'AMAZON.StopIntent': function() {
            this.emit(":tell", "OK, good bye")
        },

        'AMAZON.CancelIntent': function() {
            this.response.speak('Ok, let\'s play again soon.');
            this.emit(':responseReady');
        },

        'SessionEndedRequest': function() {
            console.log('session ended!');
            this.emit(':saveState', true);
        }
    })
);