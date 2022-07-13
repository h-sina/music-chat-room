<template>
  <div>
    <div class="card" style="padding-top: 50px;">
      <img
        src="../assets/space-5203722_1280.jpg"
        alt="找不到照片"
        style="width: 80px; height: 80px; border-radius: 50px; border: 1px solid #eee;"
      />
      <h2>HuangSina</h2>
    </div>
    <div class="tags">
      <div class="title">标签云</div>
      <el-tag class="item" type="info">豆瓣电影</el-tag>
      <el-tag class="item" type="info">vue3</el-tag>
      <el-tag class="item" type="info">elementplus</el-tag>
      <el-tag class="item" type="info">网易云音乐</el-tag>
      <el-tag class="item" type="info">typescript</el-tag>
    </div>
    <div class="card">
      <h3>本站公众号</h3>
      <img src="../assets/logo.png" alt="找不到照片" style="width: 100px;" />
    </div>
  </div>
</template>

<script setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting
} from "@element-plus/icons-vue";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.card {
  border-bottom: 1px solid #eee;
  padding: 5px;
  height: 200px;
  box-sizing: border-box;
}
.tags {
  min-height: 200px;
  padding: 5px 0 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.tags .title {
  font-size: 14px;
  color: #969696;
}
.tags .item {
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #eee;
  color: #333;
  margin: 10px 10px 0 0;
  text-decoration: none;
}
.tags .item :hover {
  color: #409eff;
}
</style>
