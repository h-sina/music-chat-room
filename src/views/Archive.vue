<template>
  <div class="main">
    <div class="main_movie" v-for="it in data.typeList" :key="it.id">
      <h4 style="width: 100%">{{it.name}}</h4>
      <div class="cardMusic" v-for="item in data.musicList[it.id]" :key="item.id">
        <div class="imgBx">
          <img :src="item.al.picUrl" @click="openMusic(item.id)" />
        </div>
        <h5>🎠{{item.name}}</h5>
        <h5>🎤{{item.ar[0].name}}</h5>
        <h5 @click="closeMusic" style="cursor: pointer;">🎶❎</h5>
        <div class="content">
          <h4>🎧📌🎵🎶</h4>
        </div>
      </div>
    </div>
    <LoadingCustom v-if="data.isLoading"></LoadingCustom>
  </div>
</template>

<script setup>
import axios from 'axios';
import request from "@/utils/request";
import LoadingCustom from "../components/Loading.vue";
import { defineComponent, reactive, onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import { Aim } from "@element-plus/icons-vue";
import musicRequest from "@/utils/musicRequest";
import { ElMessage } from "element-plus";
let audio = new Audio();
/** 播放音乐 */
const openMusic = id => {
  audio.pause();
  musicRequest('get', `/song/url?id=${id}`)
    .then(res => {
      audio.src = res.data.data[0].url;
      audio.play()
        .then(() => {
          ElMessage({
            message: "稍等正在获取资源",
            type: "success"
          });
        })
        .catch(err => {
          ElMessage({
            message: "很抱歉资源未找到",
            type: "error"
          });
        });
    })
    .catch(err => {
      ElMessage({
        message: "很抱歉资源未找到",
        type: "error"
      });
    });
};
/** 关闭音乐 */
const closeMusic = () => {
  console.log("closed");
  audio.pause();
};
components: {
  LoadingCustom;
}
onMounted(() => {
  axios
    .get("https://wyy-4u9j092ck-h-sina.vercel.app/personalized?limit=5")
    .then(res => {
      data.typeList = res.data.result;
      for (let i = 0; i < data.typeList.length; i++) {
        axios
          .get(
            `https://wyy-4u9j092ck-h-sina.vercel.app/playlist/track/all?id=${data.typeList[i].id}&limit=8&offset=1`
          )
          .then(res => {
            data.musicList[data.typeList[i].id] = res.data.songs;
          })
          .catch(err => {
            alert(err);
          });
        data.isLoading = false;
      }
    })
    .catch(err => {
      alert(err);
    });
})
const data = reactive({
  musicList: [],
  typeList: [],
  isLoading: true
});

/** 切换路由时停止音乐的播放 */
onBeforeRouteLeave((to, from, next) => {
  audio.pause();
  next();
})
</script>

<style scoped>
.main {
  /* height: 90vh; */
  /* width: 100%; */
  /* background-color: red; */
}
.main_movie {
  box-sizing: border-box;
  position: relative;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.main_movie .cardMusic {
  box-sizing: border-box;
  position: relative;
  width: 200px;
  height: 270px;
  background-color: #fff;
  transition: 0.3s ease-in-out;
  margin: 30px 10px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}
.main_movie .cardMusic:hover {
  height: 340px;
}
.main_movie .cardMusic .imgBx {
  position: relative;
  top: -30px;
  width: 180px;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  background-color: rgb(204, 201, 201);
}

.main_movie .cardMusic .imgBx img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: transparent;
}
.main_movie .cardMusic h5 {
  margin: 0;
}

.main_movie h4 {
  margin: 30px 0;
  font-size: 18px;
  font-weight: 500px;
}

.main_movie .cardMusic .hh4 {
  margin: 0;
  text-align: center;
  padding-top: 3px;
  position: relative;
  top: -30px;
  font-size: 12px;
}

.main_movie .cardMusic p {
  font-size: 14px;
}

.main_movie .cardMusic .content {
  position: relative;
  padding: 10px 15px;
  text-align: center;
  color: #111;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.main_movie .cardMusic:hover .content {
  visibility: visible;
  opacity: 1;
  transition-delay: 0.1s;
}
</style>