<template>
  <div class="container">
    <div class="chatRoom">
      <div v-if="roomVisible" class="background">
        <div class="banner">
          <div>
            <span>ID:888</span>
            <span>
              <font-awesome-icon icon="fa-solid fa-house-fire" />即时聊天室
            </span>
            <span>
              <a @click="share">
                <font-awesome-icon icon="fa-solid fa-share" />分享
              </a>
            </span>
          </div>
          <div>
            <span>
              <a target="_blank" href="https://github.com/h-sina">
                <font-awesome-icon icon="fa-brands fa-github" />开源地址
              </a>
            </span>

            <span>
              <font-awesome-icon icon="fa-solid fa-people-roof" />
              在线[{{ persons }}]
            </span>

            <span>
              <a @click="fullScreen" v-show="changeFull">
                <font-awesome-icon icon="fa-solid fa-expand" />全屏
              </a>
              <a @click="smallScreen" v-show="!changeFull">
                <font-awesome-icon icon="fa-solid fa-compress" />小屏
              </a>
            </span>
            <span>
              <a @click="close">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />退出
              </a>
            </span>
          </div>
        </div>
        <!-- <p id="p"></p> -->
        <div class="main">
          <div id="p"></div>
          <div class="textareaBanner">
            <span>
              <font-awesome-icon icon="fa-solid fa-image" />表情
            </span>
            <span>
              <a @click="pickMusic">
                <font-awesome-icon icon="fa-solid fa-music" />点歌
              </a>
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-clapperboard" />看电影
            </span>
          </div>
          <textarea class="textarea" placeholder="回车发送" @keyup.enter="send" v-model="msg"></textarea>
        </div>
      </div>
      <div v-if="!roomVisible" style="width:100%;">
        <img
          @click="enteragain"
          style="height:100%;"
          src="../assets/6823b1a4d138ab0891471d76f4e74802.gif"
        />
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="分享到" width="30%">
      <div class="share">
        <a @click="shareToQQ">
          <font-awesome-icon icon="fa-brands fa-qq" />QQ
        </a>
        <a @click="shareToWeChat">
          <font-awesome-icon icon="fa-brands fa-weixin" />微信
        </a>
        <a @click="shareToWebo">
          <font-awesome-icon icon="fa-brands fa-weibo" />微博
        </a>
      </div>
    </el-dialog>
    <el-dialog v-model="MdialogVisible" title="pick你喜欢的" width="30%">
      <div class="share">
        <a @click="shareToQQ">
          <font-awesome-icon icon="fa-brands fa-qq" />QQ
        </a>
        <a @click="shareToWeChat">
          <font-awesome-icon icon="fa-brands fa-weixin" />微信
        </a>
        <a @click="shareToWebo">
          <font-awesome-icon icon="fa-brands fa-weibo" />微博
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import io from 'socket.io-client';
import { onMounted, ref, computed, reactive, onUnmounted } from 'vue';
import { store } from '@/store/index';
import axios from 'axios';
import { musicList, DmusicList } from '@/music/index';
import { onBeforeRouteLeave } from 'vue-router';
import { useRouter } from 'vue-router';
const url = 'http://81.69.234.69:8000';
const persons = ref(0);
const msg = ref('');
const userinfo = store.getters.getUserInfo;
const changeFull = ref(true);
const dialogVisible = ref(false);
const roomVisible = ref(true);
const MdialogVisible = ref(false);
const router = new useRouter();
const param = reactive({
  url: url || 'www.baidu.com',
  /*分享地址*/
  desc: '![http://localhost:3000/chat](点击进入)',
  /*分享理由(可选)*/
  title: '小型娱乐平台，快来和我一起边听边聊~',
  /*分享标题(可选)*/
  summary: '快来和我一起边听边聊',
  /*分享描述(可选)*/
  // pics: pic || '',
  /*分享图片(可选)*/
  // flash: '',
  /*视频地址(可选)*/
  // site: '' /*分享来源 (可选) */
});
/** 分享 */
const share = () => {
  dialogVisible.value = true;
}
/** 分享到QQ */
const shareToQQ = () => {
  var s = [];
  for (var i in param) {
    s.push(i + '=' + encodeURIComponent(param[i] || ''));
  }
  var targetUrl = "https://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
  window.open(targetUrl, '_blank', 'height=520, width=720');
}
/** 分享到微信 */
const shareToWeChat = () => {

}
/** 分享到微博 */
const shareToWebo = () => {
  var temp = [];
  for (var p in param) {
    temp.push(p + '=' + encodeURIComponent(param[p] || ''))
  }
  var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
  window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
}
/** 全屏 */
const fullScreen = () => {
  var elem = document.getElementsByClassName("chatRoom")[0];
  requestFullScreen(elem);
  changeFull.value = false;
}
const requestFullScreen = (element) => {
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}
/** 取消全屏 */
const smallScreen = () => {
  changeFull.value = true;
  var $cancelFullScreen = document.getElementsByClassName("chatRoom")[0];
  if ($cancelFullScreen) {
    $cancelFullScreen.addEventListener("click", function () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }, false);
  }
}

/** 连接 */
const socket = io(url, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  auth: {
    token: '123',
  },
  cors: true,
});
let audio = new Audio();

onMounted(() => {
  audio.src = musicList[parseInt(Math.random() * musicList.length)];
  audio.play();

  socket.on('connect', function () {
    console.log('连接到服务器');
    socket.emit('name', userinfo.username, (response) => {
      console.log(response)
      persons.value = response.status;
    });
  });
  let newDiv = document.createElement('div');
  newDiv.innerHTML = '🎉欢迎你进入聊天室🎉';
  newDiv.style.display = 'flex';
  newDiv.style.justifyContent = 'center';
  document.getElementById('p').appendChild(newDiv);
});
/** 监听欢迎广播 */
socket.on('welcome', (result) => {
  console.log('Welcome')
  console.log(result);
  persons.value = result.persons;
  let newDiv = document.createElement('div');
  newDiv.innerHTML = result.time + ' ' + result.msg;
  newDiv.style.display = 'flex';
  newDiv.style.justifyContent = 'center';
  document.getElementById('p').appendChild(newDiv);
});

/** 监听消息广播 */
socket.on('broadcast', (result) => {
  createDialog(2, result.msg, result.username);
});

/** 监听断开连接 */
socket.on('disconnect', function () {
  console.log('连接断开');
});

/** 监听人离开广播 */
socket.on('somebodyExit', (response) => {
  persons.value = response.status;
});

/** 创建消息 */
const createDialog = (type, data, username) => {
  let container = document.createElement('div');
  let newDiv = document.createElement('div');
  let head = document.createElement('div');
  let one = document.createElement('div');

  one.style.borderTop = '8px solid transparent';
  if (type === 1) {
    one.style.borderLeft = '8px solid #00b96b';
    one.style.borderRight = '8px solid transparent';
    newDiv.style.backgroundColor = '#00b96b';
    head.innerHTML = '我';
    container.style.justifyContent = 'flex-end';
  } else {
    one.style.borderLeft = '8px solid transparent';
    one.style.borderRight = '8px solid #eeeeee';
    newDiv.style.backgroundColor = '#eeeeee';
    head.innerHTML = username;
    container.style.justifyContent = 'flex-start';
    newDiv.style.color = 'black';
  }

  one.style.borderBottom = '8px solid transparent';
  one.style.width = '0px';
  one.style.height = '0px';

  newDiv.innerHTML = data;
  newDiv.style.padding = '5px';
  newDiv.style.borderRadius = '5px';

  container.style.display = 'flex';
  container.style.margin = '5px';
  container.style.alignItems = 'center';
  if (type === 1) {
    container.appendChild(newDiv);
    container.appendChild(one);
    container.appendChild(head);
  } else {
    container.appendChild(head);
    container.appendChild(one);
    container.appendChild(newDiv);
  }

  document.getElementById('p').appendChild(container);
};

/** 触发发送消息 */
const send = () => {
  console.log(msg.value)
  if (msg.value == '\n' || msg.value == '\n\n') {
    msg.value = '';
    return;
  }
  createDialog(1, msg.value);
  socket.emit('send', { data: msg.value, username: userinfo.username });
  msg.value = '';
};

/** 触发离开按钮 */
const close = () => {
  socket.emit('exit', { username: userinfo.username });
  roomVisible.value = false;
  audio.pause();
};

/** 再次进入聊天室 */
const enteragain = () => {
  roomVisible.value = true;
  audio.play();
}
/** 点歌 */
const pickMusic = () => {
  // MdialogVisible.value = true;
  router.push("/archive");
}
/** 切换路由时停止音乐的播放 */
onBeforeRouteLeave((to, from, next) => {
  socket.emit('exit', { username: userinfo.username });
  audio.pause();
  next();
})
/** 页面刷新 */
window.onbeforeunload = (to, from, next) => {
  socket.emit('exit', { username: userinfo.username });
}
</script>

<style scoped>
.share {
  display: flex;
  justify-content: space-around;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #2c3e50;
  padding: 5px;
}
.container {
  display: flex;
  justify-content: center;
  color: black;
}
.chatRoom {
  height: 90vh;
  width: 100%;
  display: flex;
  background-color: black;
}
.background {
  width: 70vw;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  padding: 5px;
  margin: auto;
  box-shadow: var(--message-panel-box-shadow, 0 0 15px #f2f2f2);
}

.banner {
  width: 100%;
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

span {
  padding: 0 5px 0 5px;
}
a:hover {
  background-color: #e0dede;
  border-radius: 0.5em 0.5em 0.5em;
}

.main {
  width: 100%;
  height: 93%;
  line-height: 20px;
}
.textareaBanner {
  border-top: 1px solid black;
  height: 7%;
  background-color: white;
  display: flex;
  /* box-sizing: border-box; */
  padding: 5px 0 3px 0;
}
.textarea {
  width: 100%;
  height: 18%;
  padding: 0;
  border: 0;
  outline: none;
  /* background-color: black; */
  border-radius: 0 0 20px 20px;
  outline: none;
  border: none;
  resize: none;
  /* color: white; */
}

#p {
  /* background-color: black; */
  width: 100%;
  height: 75%;
  overflow: scroll;
}
</style>