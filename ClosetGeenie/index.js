'use strict';

const Alexa = require('alexa-sdk');
const appConstants = require('./constants/appConstants');
const dayHandler = require('./handlers/day');
const rootHandler = require('./handlers/root');
const settingsHandler = require('./handlers/settings');
const tripHandler = require('./handlers/trip');

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);

    alexa.appId = appConstants.appId;
    alexa.registerHandlers(dayHandler, rootHandler, settingsHandler, tripHandler);
    alexa.execute();
};

'use strict';

const Alexa = require('alexa-sdk');

const handlers = {

    'LaunchRequest': function() {
        this.emit(':ask', "Just keeping the session open");
        this.emit(':responseReady');
    },

    // User gives an answer
    'RootRequest': function() {
        this.emit(":tell", "Congrats, you've success!");
    },

    // Stop
    'AMAZON.StopIntent': function() {
        this.emit(":tell", "OK, good bye")
    },

    // Cancel
    'AMAZON.CancelIntent': function() {
        this.response.speak('Ok, let\'s play again soon.');
        this.emit(':responseReady');
    },

    // Save state
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(':saveState', true);
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.dynamoDBTableName = 'StateCapitalFlashcards';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
