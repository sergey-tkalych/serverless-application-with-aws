const messages = require('../../modules/messages');
const LambdaResponse = require('../../modules/lambda/response');
const LambdaError = require('../../modules/lambda/error');
const { LambdaListParams, LambdaBodyParams } = require('../../modules/lambda/params');

exports.list = (event) => {
  const listParams = new LambdaListParams(event.queryStringParameters);
  return messages
    .list(listParams)
    .then(LambdaResponse.create);
}

exports.create = (event) => {
  const bodyParams = new LambdaBodyParams(event.body);

  if (!bodyParams.params.message) {
    throw LambdaError.badRequest('[message] parameter is required.');
  }

  return messages
    .create(bodyParams.params.message)
    .then(LambdaResponse.create);
}

exports.delete = (event) => {
  return messages
    .delete(event.pathParameters.id)
    .then(LambdaResponse.create);
}