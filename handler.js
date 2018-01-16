'use strict';

const Alexa = require('alexa-sdk');
const config = require('./config');
const request = require('request');

const newSessionHandlers = {
  'LaunchRequest': function () {
    this.emit(':ask', config.welcomeMessage);
  },

  'getOverview': function () {
    this.emit(':ask', config.welcomeMessage);
  },

  'Unhandled': function () {
    this.emit(':ask', config.helpMessage);
  },

  'AMAZON.StopIntent': function () {
    this.emit(':tell', config.goodbyeMessage);
  },

  'SessionEndedRequest': function () {
    this.emit('AMAZON.StopIntent');
  },

  'ControlPowerOn': function () {
    const context = this;
    request.post(config.apiBaseUrl + '/control/power/on', {
      'auth': {
        'bearer': config.apiSecret
      }
    }, function(err, res) {
      if (err || res.statusCode !== 200) {
        console.log(err);
        context.emit(":tell", config.errorMessage);
        return;
      }

      context.emit(":tell", "ok");
    });
  },

  'ControlPowerOff': function () {
    const context = this;
    request.post(config.apiBaseUrl + '/control/power/off', {
      'auth': {
        'bearer': config.apiSecret
      }
    }, function(err, res) {
      if (err || res.statusCode !== 200) {
        console.log(err);
        context.emit(":tell", config.errorMessage);
        return;
      }

      context.emit(":tell", "ok");
    });
  },

  'ControlMediaPlay': function () {
    const context = this;
    request.post(config.apiBaseUrl + '/control/media/play', {
      'auth': {
        'bearer': config.apiSecret
      }
    }, function(err, res) {
      if (err || res.statusCode !== 200) {
        console.log(err);
        context.emit(":tell", config.errorMessage);
        return;
      }

      context.emit(":tell", "ok");
    });
  },

  'ControlMediaPause': function () {
    const context = this;
    request.post(config.apiBaseUrl + '/control/media/pause', {
      'auth': {
        'bearer': config.apiSecret
      }
    }, function(err, res) {
      if (err || res.statusCode !== 200) {
        console.log(err);
        context.emit(":tell", config.errorMessage);
        return;
      }

      context.emit(":tell", "ok");
    });
  }
};

module.exports.index = (event, context) => {
  if (event.request.hasOwnProperty('intent') && event.request.intent.hasOwnProperty('name')) {
    console.log("INTENT: " + event.request.intent.name);
  }
  if (event.request.hasOwnProperty('intent') && event.request.intent.hasOwnProperty('slots') && event.request.intent.slots !== {}) {
    console.log("SLOTS:");
    console.log(JSON.stringify(event.request.intent.slots, null, 3));
  }

  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(newSessionHandlers);
  alexa.execute();
};
