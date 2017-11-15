class LambdaRasponse{
  constructor(data, statusCode, statusMessage){
    this.data = data || {};
    this.statusCode = statusCode || 200;
    this.statusMessage = statusMessage || 'Success';
    this.headers = {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    };
  }

  static create(data, statusCode, statusMessage){
    return new LambdaRasponse(data, statusCode, statusMessage);
  }

  toObject(){
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: JSON.stringify({
        statusMessage: this.statusMessage,
        data: this.data,
      })
    };
  }
}

module.exports = LambdaRasponse;