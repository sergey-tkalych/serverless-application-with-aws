<template>
  <div>
    <h1>Post a message!</h1>
    <div id="messageForm">
      <div>
        <input id="messageInput" type="text" placeholder="Leave a great idea..." v-model="message" @change="postMessage()"/>
      </div>
    </div>
    <div id="messages">
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
    };
  },

  created() {
    HTTP
      .get('messages')
      .then((response) => {
        this.messages = response.data.data.Items;
      });
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
#messages ul{
  list-style: none;
  padding: 0;
  margin: 20px 0;
}
#messages li{
  padding: 10px 0;
}
</style>
