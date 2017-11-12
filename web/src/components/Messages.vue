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
          <span>{{item.message}}</span>
          <span class="delete" @click="deleteMessage(item)">delete</span>
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
    postMessage() { // Todo: handle errors
      HTTP
        .post('messages', {
          message: this.message,
        })
        .then((response) => {
          this.message = '';
          this.messages.unshift(response.data.data);
        });
    },

    loadMoreMessages() { // Todo: handle errors
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

    deleteMessage(message) { // Todo: handle errors
      HTTP
        .delete(`messages/${message.id}`)
        .then(() => {
          const messageIndex = this.messages.indexOf(message);
          this.messages.splice(messageIndex, 1);
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
  margin: 0;
}
#messages li{
  padding: 20px 0 0;
  transition: color .5s;
  position: relative;
}
#messages li .delete{
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  text-align: right;
  cursor: pointer;
  color: #848484;
}
#messages li:hover{
  color: #7551b7;
}
#messages li:hover .delete{
  display: inline-block;
}
</style>
