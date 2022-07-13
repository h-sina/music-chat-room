<template>
  <div class="main_movie">
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
import { defineComponent, reactive } from "vue";
import { Aim } from "@element-plus/icons-vue";
let audio = new Audio();
const openMusic = id => {
  audio.pause();
  // request('get', `/song/url?id=${id}`)
  axios
    .get(`https://wyy-4u9j092ck-h-sina.vercel.app/song/url?id=${id}`)
    .then(res => {
      console.log(res.data.data[0].url);
      audio.src = res.data.data[0].url;
      audio.play();
    })
    .catch(err => {
      alert(err);
    });
};
const closeMusic = () => {
  console.log("closed");
  audio.pause();
};
components: {
  LoadingCustom;
}
const data = reactive({
  musicList: [],
  typeList: [],
  isLoading: true
});

// request('get', `personalized?limit=5`)
axios
  .get("https://wyy-4u9j092ck-h-sina.vercel.app/personalized?limit=5")
  .then(res => {
    console.log(res.data.result);
    data.typeList = res.data.result;
    console.log(data.typeList);
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
</script>

<style scoped>
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