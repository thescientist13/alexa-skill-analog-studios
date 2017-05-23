// this require is assumed of the Lambda NodeJS runtime
const Alexa = require('alexa-sdk');

const APP_ID = '';
const SKILL_NAME = 'Analog Studios';
const NAMES = [
  'Dave',
  'Owen'
];

function getName() {
  let nameIndex = Math.floor(Math.random() * NAMES.length);
  let name = NAMES[nameIndex];

  return name;
}

let handlers = {
  'LaunchRequest': function () {
    this.emit('GetMessage');
  },
  'Unhandled': function () {
    this.emit('AMAZON.HelpIntent');
  },
  'GetNewMessageIntent': function () {
    this.emit('GetMessage');
  },
  'GetMessage': function () {
    let name = getName();
    let speechOutput = `Hi ${name}!  This message sent from Analog Studios.`;

    this.emit(':tellWithCard', speechOutput, SKILL_NAME, name);
  },
  'AMAZON.HelpIntent': function () {
    let speechOutput = 'You can say just my invocation word for a message or, you can say exit...';
    let reprompt = 'What can I help you with?';

    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Goodbye!');
  }
};

exports.handler = function(event, context) {
  let alexa = Alexa.handler(event, context);

  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};