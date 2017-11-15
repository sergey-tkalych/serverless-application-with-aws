const LambdaResponse = require('./response');

class LambdaError extends LambdaResponse {
  constructor(data, statusCode, statusMessage) {
    super(data, statusCode, statusMessage);
  }

  static badRequest(data){
    return new LambdaError(data, 400, 'Bad request');
  }

  static uncaughted(data) {
    return new LambdaError(data, 500, 'Uncaughted');
  }

  toObject(){
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: JSON.stringify({
        error: true,
        statusMessage: this.statusMessage,
        data: this.data,
      })
    };
  }
}

module.exports = LambdaError;