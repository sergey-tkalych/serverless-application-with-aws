<template>
  <div>
    <h1>Post a message!</h1>
    <div id="messageForm">
      <div>
        <input id="messageInput" type="text" placeholder="Leave a great idea..." v-model="message" @change="postMessage()" autocomplete="off"/>
      </div>
    </div>
    <div id="messages" v-infinite-scroll="loadMoreMessages" infinite-scroll-disabled="loadingMessages" infinite-scroll-distance="10">
      <ul>
        <li v-for="item of messages" :key="item.id">
          {{item.message}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HTTP from '../modules/http';

export default {
  name: 'Messages',

  data() {
    return {
      messages: [],
      message: '',
      loadingMessages: false,
      messagesLoadLimit: 10,
      messagesLastKey: null,
    };
  },

  methods: {
    postMessage() {
      HTTP
        .post('messages', {
          message: this.message,
        })
        .then((response) => {
          this.message = '';
          this.messages.unshift(response.data.data);
        });
    },

    loadMoreMessages() {
      this.loadingMessages = true;
      HTTP
        .get(`messages?limit=${this.messagesLoadLimit}&last=${JSON.stringify(this.messagesLastKey)}`)
        .then((response) => {
          this.messages = this.messages.concat(response.data.data.Items);
          this.messagesLastKey = response.data.data.LastEvaluatedKey;
          if (this.messagesLastKey) {
            this.loadingMessages = false;
          }
        });
    },
  },
};
</script>

<style scoped>
#messageForm {
  padding: 0 100px;
}
#messageInput {
  border: none;
  border-bottom: 1px solid #f1efef;
  width: 100%;
  height: 30px;
  font-size: 20px;
  text-align: center;
}
#messageInput:focus{
  outline-width: 0;
}
#messages ul{
  list-style: none;
  padding: 0;
  margin: 20px 0;
}
#messages li{
  padding: 10px 0;
}
</style>
