'use strict';

const Alexa = require('alexa-sdk');
const constants = require('constants');

const initialHandlers = require('initialHandlers');
const definitionHandlers = require('definitionHandlers');
const questionnaireHandlers = require('questionnaireHandlers');
const apiCalls = require("apiCalls");

exports.handler = function(event, context, callback){
  let alexa = Alexa.handler(event, context);

  alexa.appId = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.registerHandlers(
      initialStateHandlers,
      definitionHandlers,
      questionnaireHandlers
  );

  alexa.execute();
};
