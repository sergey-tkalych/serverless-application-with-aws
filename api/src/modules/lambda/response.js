class LambdaRasponse{
  constructor(data, statusCode, statusMessage){
    this.data = data;
    this.statusCode = statusCode || 200;
    this.statusMessage = statusMessage || 'Success';
  }

  static create(data, statusCode, statusMessage){
    return new LambdaRasponse(data, statusCode, statusMessage);
  }

  toObject(){
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        statusMessage: this.statusMessage,
        data: this.data,
      })
    };
  }
}

module.exports = LambdaRasponse;