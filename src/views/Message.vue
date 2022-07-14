<template>
  <div class="message">
    <div class="add">
      <el-button @click="data.dialogVisible = true">留言</el-button>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in data.commentList"
        :key="index"
        :timestamp="moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss')"
      >{{ item.context }}</el-timeline-item>
    </el-timeline>
    <el-dialog v-model="data.dialogVisible" title="硕一硕" width="50%" :before-close="handleClose">
      <el-form :model="data.form">
        <el-form-item>
          <el-input v-model="data.form.context"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmComment">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, defineComponent, onMounted } from "vue";
import LoadingCustom from "../components/Loading.vue";
import moment from "moment";
import qs from "qs";
import { ElMessage } from "element-plus";
import request from "@/utils/request";
import { getAuth } from '@/utils/auth';
const Auth = getAuth();
const data = reactive({
  commentList: [],
  isLoading: false,
  dialogVisible: false,
  form: {
    context: "",
    createdTime: ""
  }
});
components: {
  LoadingCustom;
}

const getComment = () => {
  request('get', '/my/comment', '', { 'Authorization': Auth })
    .then(res => {
      data.commentList = res.data;
      data.isLoading = false;
    })
    .catch(err => {
      alert(err);
    });
};
const handleClose = () => {
  data.dialogVisible = false;
  data.form = {};
};
const confirmComment = () => {
  data.form.createdTime = new Date();
  moment(data.form.createdTime).format("YYYY-MM-DD HH:mm:ss");
  request('post', '/my/addcomment', qs.stringify(data.form), { 'Authorization': Auth, 'content-type': 'application/x-www-form-urlencoded' })
    .then(res => {
      if (res.data.status == 0) {
        ElMessage({
          message: "留言成功！",
          type: "success"
        });
      } else {
        ElMessage({
          message: "留言失败！请联系管理员",
          type: "error"
        });
      }
      getComment();
    })
    .catch(err => {
      alert(err);
    });
  handleClose();
};
onMounted(() => {
  getComment()
})
</script>

<style scoped>
.message {
  margin: 30px;
  text-align: left;
}
.add {
  margin: 10px;
}
</style>
