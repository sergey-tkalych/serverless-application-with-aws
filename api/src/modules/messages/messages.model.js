const uuid = require('uuid');

class MessagesModel {
  constructor(message) {
    this.id = uuid();
    this.message = message;
    this.createdAt = new Date().toISOString();
  }

  toObject(){
    return {
      id: this.id,
      message: this.message,
      createdAt: this.createdAt,
    };
  }
}

module.exports = MessagesModel;