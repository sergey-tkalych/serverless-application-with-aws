class LambdaParams {
  constructor(data) {
    this.data = data;
    this.params = {};
  }

  parse(data) { }

  printData() {
    console.log(this.data);
  }

  print() {
    console.log(JSON.stringify(this.params));
  }
}

class LambdaListParams extends LambdaParams {
  constructor(data) {
    super(data);
    this.params = this.parse(data);
  }

  parse(data) {
    let params = {
      limit: 10,
    };
    if (data) {
      if (data.limit) {
        params.limit = data.limit;
      }
      if (data.last) {
        params.last = JSON.parse(data.last);
      }
    }
    return params;
  }
}

class LambdaBodyParams extends LambdaParams {
  constructor(data) {
    super(data);
    this.params = this.parse(data);
  }

  parse(data) {
    let params = {
    };
    if (data) {
      params = JSON.parse(data);
    }
    return params;
  }
}

exports.LambdaListParams = LambdaListParams;
exports.LambdaBodyParams = LambdaBodyParams;