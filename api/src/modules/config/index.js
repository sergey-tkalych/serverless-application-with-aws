const config = {
  isOffline: process.env.IS_OFFLINE === 'true',
  dynamodb: {
    local: {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    },
    tables: {
      MESSAGES_DYNAMODB_TABLE: process.env.MESSAGES_DYNAMODB_TABLE || 'messages-api-dev-MessagesDynamoDbTable',
    },
  },
};

module.exports = config;