'use strict';

module.exports = {
    welcomeMessage: "You can control you Vizio Smartcast with basic commands. Say 'help' for some examples.",

    helpMessage: "Here are some things you can say: 'turn the tv on', 'change the input to smartcast', or 'pause the tv'. What would you like to do?",

    goodbyeMessage: "Goodbye",

    errorMessage: "There was an error executing the command",

    apiBaseUrl: process.env.API_BASE_URL || null,

    apiSecret: process.env.API_SECRET || null
};