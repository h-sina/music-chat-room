<template>
  <div>
    <div class="movieLunbo">
      <el-carousel height="280px">
        <el-carousel-item v-for="item in data.lunboList" :key="item">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <img :src="item.src" />
          <!-- <img src="../assets/p2834144841.webp" style="width: 1000px; height: 280px;"/> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main_movie">
      <div class="card" v-for="item in data.movieList" :key="item.id">
        <div class="imgBx">
          <img :src="item.data[0].poster" />
        </div>
        <h4 class="hh4">💘{{item.doubanRating}}👩‍⚖️{{item.doubanVotes}}🌘{{item.data[0].country}}</h4>
        <div class="content">
          <h4>{{item.data[0].name}}</h4>
          <p>{{item.data[0].description}}</p>
          <h5>🕐{{item.dateReleased}}</h5>
        </div>
      </div>
    </div>
    <LoadingCustom v-if="data.isLoading"></LoadingCustom>
  </div>
</template>

<script>
import axios from "axios";
import LoadingCustom from "../components/Loading.vue";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  components: {
    LoadingCustom
  },
  setup (props, context) {
    const data = reactive({
      // movieList: [] as Array<any>,
      movieList: [],
      isLoading: true,
      lunboList: [
        { src: require("../assets/p2834141607.webp") },
        { src: require("../assets/p2813191049.webp") },
        { src: require("../assets/p2845534124.webp") },
        { src: require("../assets/p2834144841.webp") }
      ]
    });
    axios
      .get("https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=40&lang=Cn")
      .then(res => {
        data.movieList = res.data;
        data.isLoading = false;
      })
      .catch(err => {
        alert(err);
      });
    return {
      data
    };
  }
});
</script>

<style scoped>
.main_movie {
  box-sizing: border-box;
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;
}
.main_movie .card {
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
.main_movie .card:hover {
  height: 540px;
}
.main_movie .card .imgBx {
  position: relative;
  top: -30px;
  width: 180px;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  background-color: rgb(204, 201, 201);
}
.main_movie .card .imgBx img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: transparent;
}
.main_movie .card .content h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 500px;
}
.main_movie .card .hh4 {
  margin: 0;
  text-align: center;
  padding-top: 3px;
  position: relative;
  top: -30px;
  font-size: 12px;
}
.main_movie .card p {
  font-size: 14px;
}
.main_movie .card .content {
  position: relative;
  top: -20px;
  padding: 10px 15px;
  text-align: center;
  color: #111;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.main_movie .card:hover .content {
  visibility: visible;
  opacity: 1;
  margin-top: -20px;
  transition-delay: 0.1s;
}
.movieLunbo {
  display: block;
}
.el-carousel {
  border-radius: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item img {
  height: 100%;
}
</style>
