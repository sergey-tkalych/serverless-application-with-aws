const functions = require('./functions');
const lambdaHandler = require('../../modules/lambda/handler');

module.exports = lambdaHandler(functions);