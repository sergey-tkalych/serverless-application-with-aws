const AWS = require('aws-sdk');
const config = require('../config');

class DynamoDB{
  static getClient(IS_OFFLINE){
    if (IS_OFFLINE) {
      return new AWS.DynamoDB.DocumentClient(config.dynamodb);
    }
    return new AWS.DynamoDB.DocumentClient();
  }
}

module.exports = DynamoDB.getClient(config.IS_OFFLINE);