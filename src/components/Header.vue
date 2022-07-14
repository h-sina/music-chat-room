<template>
  <el-container>
    <div style="width: 10vw;">
      <img src="../assets/logo.png" alt="找不到照片" style="width:50px; margin:10px;" />
    </div>
    <div style="flex: 1; text-align: center">
      <el-menu class="el-menu-demo" router mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item,i) in data.navList" :key="i" :index="item.name">{{item.navItem}}</el-menu-item>
      </el-menu>
    </div>
    <div style="width:15vw" class="header_right">
      <!-- <el-icon :size="35"><watch /></el-icon> -->
      <el-button type="primary" @click="dislogClose.dialogVisible = true">登录</el-button>
      <el-button type="danger" @click="dislogClose.dialogVisibleRe = true">注册</el-button>
      <a
        href="https://h-sina.github.io"
        target="_blank"
        class="github-corner"
        aria-label="View source on Github"
      >
        <svg viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px;"
            class="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          />
        </svg>
      </a>
    </div>
    <!-- 登录弹框 -->
    <el-dialog
      v-model="dislogClose.dialogVisible"
      title="登录"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="data.form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="data.form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="data.form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="success" @click="dislogClose.dialogVisible = false">gitHub授权登录</el-button>
          <el-button type="primary" @click="submitLogin">登录</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog
      v-model="dislogClose.dialogVisibleRe"
      title="注册"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="data.formRe" :rules="data.rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="data.formRe.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="data.formRe.password" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="昵称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="简介">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>-->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="success" @click="dislogClose.dialogVisibleRe = false">gitHub授权登录</el-button>
          <el-button type="primary" @click="submitRegister">注册</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { Watch } from "@element-plus/icons-vue";
import { ref } from "vue";
import { reactive } from "vue";
import axios from "axios";
import qs from "qs";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import request from "@/utils/request";
import { setAuth, clearAuth } from '@/utils/auth'
const router = useRouter();
const data = reactive({
  form: {
    username: "",
    password: ""
  },
  formRe: {
    username: "",
    password: ""
  },
  rules: {
    username: [
      { required: true, message: "请输入账号", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
    ]
  },
  navList: [
    { name: "/", navItem: "首页" },
    { name: "/articles", navItem: "电影" },
    { name: "/archive", navItem: "音乐" },
    // { name: "/timeline", navItem: "历程" },
    // { name: "/project", navItem: "项目" },
    { name: "/message", navItem: "留言" },
    { name: "/chat", navItem: "聊天室" }
    // { name: "/about", navItem: "关于" }
  ]
});
const dislogClose = reactive({
  dialogVisible: false,
  dialogVisibleRe: false
});
const handleClose = () => {
  dislogClose.dialogVisible = false;
  dislogClose.dialogVisibleRe = false;
  data.form = {};
  data.formRe = {};
};
const submitLogin = () => {
  if (!data.form.username || !data.form.password) return;
  request('post', '/api/login', qs.stringify(data.form), { 'content-type': 'application/x-www-form-urlencoded' })
    .then(res => {
      if (res.data.status == 0) {
        const re = res.config.data.split("&");
        const userInfo = {
          username: re[0].split("=")[1],
          password: re[1].split("=")[1]
        };
        ElMessage({
          message: "登录成功！开始你的博客之旅吧🧐",
          type: "success"
        });
        setAuth({ token: res.data.token, info: { username: userInfo.username } }, 1);

        router.push("/articles");
      } else {
        ElMessage.error("登录失败！用户名或密码错误欸😮");
      }
    })
    .catch(err => {
      alert(err);
    });
  handleClose();
};
const submitRegister = () => {
  if (!data.formRe.username || !data.formRe.password) return;
  request('post', '/api/register', qs.stringify(data.formRe), { 'content-type': 'application/x-www-form-urlencoded' })
    .then(res => {
      if (res.data.status == 0) {
        ElMessage({
          message: "注册成功！快去登录吧😁",
          type: "success"
        });
      } else {
        ElMessage.error("注册失败😥，用户名已存在！");
      }
    })
    .catch(err => {
      alert(err);
    });
  handleClose();
};
const selectLoginout = () => {
  clearAuth();
};
</script>

<style scoped>
.a {
  text-decoration: none;
  display: block;
  padding: 0;
}
.header_right {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}
svg {
  color: #fff;
  fill: var(--theme-color, #42b983);
  height: 40px;
  width: 40px;
}
</style>