'use strict';

const Alexa = require('alexa-sdk');


const handlers = {

    'LaunchRequest': function() {

        if(Object.keys(this.attributes).length === 0) {
            this.attributes[numberCorrect] = 0;
            this.attributes[currentFlashcardIndex] = 0;
            this.response.speak("Welcome to Flashcards Let's get started. " +
                this.emit('AskQuestion')).listen(this.emit('AskQuestion'));
        } else {
            this.response.speak("Welcome back to Flashcards. You're on question " + this.attributes[currentFlashcardIndex] +
                " and have answered " + this.attributes[numberCorrect] + " correctly. " +
                this.emit('AskQuestion')).listen(this.emit('AskQuestion'));
        }
        this.emit(':responseReady');
    },

    // User gives an answer
    'AnswerIntent': function() {
        var userAnswer = this.event.request.intent.slot.capitals.value;
        var currentFlashcardIndex = this.attributes[currentFlashcardIndex];
        var response = "";

        if(userAnswer.toLowerCase() === flashcardsDictionary[currentFlashcardIndex].capital.toLowerCase()){
            this.attributes[numberCorrect]++;
            response = "You're Correct!";
        } else {
            response = "Sorry, you're mistaken.";
        }
        this.attributes[currentFlashcardIndex]++;
        this.response.speak(response + " Next question! " + this.emit('AskQuestion')).listen(this.emit('AskQuestion'));
        this.emit(':responseReady');
    },

    'AskQuestion' : function(){
        var currIndex = this.attributes[currentFlashcardIndex];
        var currentState = flashcardsDictionary[currIndex].name;

        this.response.speak("What is the capital of " + currentState + "?");
        this.emit('AnswerIntent');
        this.emit(':responseReady');
    },
    // Stop
    'AMAZON.StopIntent': function() {
        this.response.speak('Ok, let\'s play again soon.');
        this.emit(':responseReady');
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
