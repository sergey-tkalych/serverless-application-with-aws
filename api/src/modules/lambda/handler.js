const LambdaError = require('./error');

function lambdaHandler(funcs) {
  let lambdas = {};
  for (let name in funcs) {
    lambdas[name] = handler(funcs[name]);
  }
  return lambdas;
}

function handler(func) {
  return async (event, context, callback) => {
    try {
      const response = await func(event);
      callback(null, response.toObject());
    } catch (error) {
      if (error instanceof LambdaError) {
        callback(null, error.toObject());
      } else {
        callback(null, LambdaError.uncaughted(error.message).toObject());
      }
    }
  }
}

module.exports = lambdaHandler;