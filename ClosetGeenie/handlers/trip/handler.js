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

        'GiveAWSDetails' : function () {
            const offeringSlot = alexaHelper.ResolveSlotValue('offerings', this.event).toLowerCase();
            if (offeringSlot in awsDetails){
                this.attributes[LASTREQUEST] = offeringSlot;
                this.attributes[INTNET] = intents.GiveAWSDetails;

                const offering =`${awsShort[offeringSlot]}`;
                this.emit(
                    ':ask',
                    `${offering} ${prompts.prompt.GiveAWSDetailsSuccess}`,
                    prompts.reprompt.GiveAWSDetailsSuccess);
            } else {
                this.emit(
                    ':ask',
                    prompts.prompt.GiveAWSDetailsFail,
                    `${prompts.reprompt.GiveAWSDetailsFail} ${OFFERINGSSPEECH}`);
            }
        },

        'ExpandAWSDetails' : function (){
            const offeringSlot = this.attributes[LASTREQUEST];
            this.attributes[INTNET] = intents.GiveAWSDetails;

            const offering =`${awsDetails[offeringSlot]}`;
            this.emit(
                ':ask',
                `${offering} ${prompts.prompt.ExpandAWSDetails}`,
                prompts.reprompt.ExpandAWSDetails);
        },

        // State entered upon switching to this state.
        'EnterState': function () {
            const awsOfferings =    prompts.prompt.EnterStateOffering(OFFERINGSSPEECH);

            this.emit(
                ':ask',
                `${awsOfferings} ${prompts.prompt.EnterState}`,
                prompts.reprompt.EnterState);
        },

        'CatchState': function() {
            this.attributes[INTENT] = intents.CatchState;
            this.emit(':ask', prompts.prompt.CatchState, prompts.reprompt.CatchState)
        },

        'AMAZON.HelpIntent': function(){
            this.emit(
                ':ask',
                prompts.prompt.HelpIntent,
                `${prompts.reprompt.HelpIntent} ${OFFERINGEXAMPLES}`);
        },

        'AMAZON.YesIntent': function(){
            switch(this.attributes[INTNET]){
                case intents.EnterState:
                    this.emitWithState('AMAZON.HelpIntent');
                    break;
                case intents.GiveAWSDetails:
                    this.emitWithState('ExpandAWSDetails');
                    break;
                case intents.ExpandAWSDetails:
                    this.emitWithState('ExpandAWSDetails');
                    break;
                case intents.HelpIntent:
                    this.emitWithState('AMAZON.HelpIntent');
                    break;
                case intents.CatchState:
                    this.emit('AMAZON.StopIntent');
                    break;
                default:
                    this.emit('Unhandled');
            }
        },

        'AMAZON.NoIntent': function(){
            switch(this.attributes[INTNET]){
                case intents.EnterState:
                    this.emitWithState('AMAZON.HelpIntent');
                    break;
                case intents.GiveAWSDetails:
                    this.emitWithState('AMAZON.HelpIntent');
                    break;
                case intents.ExpandAWSDetails:
                    this.emitWithState('EnterState');
                    break;
                case intents.HelpIntent:
                    this.emitWithState('CatchState');
                    break;
                case intents.CatchState:
                    this.emit('AMAZON.HelpIntent');
                    break;
                default:
                    this.emit('Unhandled');
            }
        }
    })
);