const AWS = require('aws-sdk');
const config = require('../config');

class DynamoDB{
  static getClient(isOffline){
    if (isOffline) {
      return new AWS.DynamoDB.DocumentClient(config.dynamodb.local);
    }
    return new AWS.DynamoDB.DocumentClient();
  }
}

module.exports = DynamoDB.getClient(config.isOffline);