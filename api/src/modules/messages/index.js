const dynamodb = require('../dynamodb');
const config = require('../config');
const MessagesModel = require('./messages.model');

const TableName = config.dynamodb.tables.MESSAGES_DYNAMODB_TABLE;

exports.list = (listParams) => {
  const params = {
    TableName,
    Limit: listParams.params.limit,
    ExclusiveStartKey: listParams.params.last,
  };

  return dynamodb
    .scan(params)
    .promise();
}

exports.create = (message) => {
  const item = new MessagesModel(message);
  const params = {
    TableName,
    Item: item.toObject(),
  };

  return dynamodb
    .put(params)
    .promise()
    .then(() => params.Item);
}