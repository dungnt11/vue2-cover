<template>
  <div class="chat">
    <h2>{{ title }}</h2>
    <div ref="content">
      <VuePerfectScrollbar class="content" ref="chatScroll" >
        <p v-for="(m, index) of messages" v-bind:key="index">
          <span class="name">{{ m.from }}: </span>{{ m.text }}
        </p>
      </VuePerfectScrollbar>
    </div>
    <div class="input-wrap">
      <textarea
        placeholder="Aa"
        rows="1"
        v-model="chatData"
        @keypress="sendMessage"
        :disabled="!chatPermission"
      ></textarea>
      <img src="@/assets/icon/like.svg" alt="Icon Like" class="pointer" v-if="!showIconSend" @click="sendLike"/>
      <img src="@/assets/icon/send.svg" alt="Icon Send" class="pointer" v-if="showIconSend" @click="sendMessage"/>
    </div>

     <modal
      name="access-notification-modal"
      classes="custom-modal"
      :width="300"
      :height="350"
      :adaptive="true"
    >
      <div class="modal-wrap">
        <img src="@/assets/icon/checked.svg"  v-if="modalIcon == 'check'"/>
        <img src="@/assets/icon/close2.svg"  v-if="modalIcon == 'close'"/>
        <h3>{{ modalTitle }}</h3>
        <p>{{ modalMessage}}</p>
        <button class="btn" @click="$modal.hide('access-notification-modal')">Đồng ý</button>
      </div>
    </modal>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: "HomeChat",
  components: {
    VuePerfectScrollbar
  },

  data: () => ({
    title: "Trò chuyện",
    showIconSend: false,
    chatData: null,
    socket: null,
    messages: [],
    modalTitle: "",
    modalMessage: "",
    modalIcon: "",
    modalColor: "",
    chatPermission: true,

  }),
  watch: {
    chatData(newData) {
      if (newData.length === 0) {
        this.showIconSend = false;
      } else {
        this.showIconSend = true;
      }
    },
    // "$store.state.App.heightTitle": {
    //   deep: true,
    //   handler(newVal) {
    //     this.$refs.content.style.height = `calc(100vh - ${this.$store.state.App.heightTitle}px - 135px)`;
    //     this.$refs.content.scrollTo(0, this.$refs.content.scrollHeight);
    //   },
    // },

  
  },
  methods: {
    scrollToBottom(){
      this.$nextTick(()=>{
        this.$refs.chatScroll.$el.scrollTop = this.$refs.chatScroll.$el.scrollHeight;
      });
     
    },
    sendMessage(e) {
      if (e.shiftKey && e.code == "Enter") {
        return;
      } else if(!this.chatData){
        return;
      } 
      
      else if(e.code == "Enter"){
        this.socket.emit("message", this.chatData, (res) => {
          this.messages.push({
            from: "Bạn",
            text: this.chatData,
            
          });
          this.chatData = "";
          this.scrollToBottom();
        });
      }
    },

    sendLike(){
       this.socket.emit("message", "👍", (res) => {
          this.messages.push({
            from: "Bạn",
            text: "👍",
          });
          this.scrollToBottom();
        });
    }
  },
  mounted() {
    this.socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      autoConnect: true,
      secure: true,
      auth: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.socket.on("message", (messsage) => {
      this.messages.push(messsage);
      if(this.$refs.chatScroll.$el.scrollTop + this.$refs.chatScroll.$el.clientHeight >= this.$refs.chatScroll.$el.scrollHeight - 100){
        this.scrollToBottom();
      }
    });

     this.socket.on("isAccess", (value) => {
      if(value == 1){
        this.modalTitle = "Thông báo";
        this.modalMessage = "Tài khoản của bạn đã được kích hoạt";
        this.modalIcon = "check";
        this.chatPermission = true;
        this.$modal.show("access-notification-modal");
      }
      else if(value == 0){
        this.modalTitle = "Cảnh báo";
        this.modalMessage = "Bạn đã bị quản trị viên vô hiệu hóa tài khoản";
        this.modalIcon = "close";
         this.chatPermission = false;
        this.$modal.show("access-notification-modal");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.pointer{
  cursor: pointer;
}
.chat {
  background: #fff;
  padding: 0 30px;
  padding-bottom: 20px;

  h2 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .content {
    /* End scroll bar */
    overflow: hidden;
    height: calc((var(--height, vh) * 100) - 78px - var(--height-title) - var(--height-reviews) - 130px);
    p {
      margin: 10px 0;
      word-break: break-all;
      font-size: 0.875rem;
      color: #5e5e5e;
      .name {
        color: #000;
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }

  .input-wrap {
    display: flex;
    justify-content: space-between;

    position: fixed;
    bottom: 10px;
    width: calc(var(--width-container, 600px) - 55px);
    textarea {
      font-family: inherit;
      background-color: #fff-1;
      width: calc(100% - 50px);
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 8px 10px;
      resize: none;
    }
  }
}
</style>
