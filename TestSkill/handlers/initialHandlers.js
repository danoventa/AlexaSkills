const Alexa = require('alexa-sdk');
const constants = require('constants');

const initialStateHandlers = Alexa.CreateStateHandler(constants.states.INITIAL, {
  'NewSession': function() {
    let userName = this.attributes['userName'];
    if(userName) {
      this.handler.state = constants.states.INITIAL;
      this.emitWithState('LaunchRequest');

      this.emit(':ask', `Welcome back ${userName}! What you like to quiz me, or should I quiz you this itme?`, `Are you scared?`);
    } else {
      this.emit(':ask', 'Good tidings new user! Are you seeking knowledge, or to test your knowledge?', "I couldn't hear your. Are you looking for information? Or would you like to test your knowledge?");
    }
  },
  // if we decide to go this route:
  // TEXT needs phone number => request using built in slots for phone numbers
  // REPROMPT to request the phone numbers.
  'NameCapture': function(){
    let userName = this.event.request.intent.slots.USFirstName.value;
    if(userName) {
      this.attributes['userName'] = userName;
      this.emit(':ask', `OK, ${userName}! Would you like to test your knowledge, or test my knowledge?`, `Sorry, ${userName}, I didn't hear you. Did you want to ask me questions? Or do you want me to ask you questions?`);
    } else {
      this.emit(':ask', `Sorry, ${userName}, I didn't recognize your name. Could you repeat it?`, `Would you please state your name again?`);
    }
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Until next time!');
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'OK, goodbye!');
  },
  'SessionEndedRequest': function() {
    this.emit(':saveState', true);
  },
  'AMAZON.HelpIntent': function(){
    var userName = this.attributes['userName'];
    username ?
      this.emit(':ask', `Hi, ${userName}, what would you like to do?`, `I didn't plan on an interrogation. Who's getting questionned here?`)
      :
      this.emit(':tell', `I don't know you...`);
  }
});

module.exports = initialStateHandlers;
