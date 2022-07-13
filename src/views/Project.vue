<template>
  <div class="block">
    <div class="add">
      <el-button @click="data.dialogVisible = true">添加时间节点</el-button>
    </div>
    <el-empty v-if="data.isNull" description="快来更新你的时间线😏"></el-empty>
    <el-timeline>
      <el-timeline-item
        v-for="item in data.timeLineList"
        :key="item.id"
        :timestamp="item.date"
        :icon="item.icon"
        :color="item.color"
        :hollow="item.hollow"
        placement="top"
      >
        <el-card>
          <h4>{{item.title}}</h4>
          <p>{{item.name}} committed {{item.date}} {{item.date2}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-dialog v-model="data.dialogVisible" title="添加时间线🤓" width="50%" :before-close="handleClose">
      <el-form :model="data.form">
        <el-form-item label="Who">
          <el-input v-model="data.form.name" placeholder="Huangsina"></el-input>
        </el-form-item>
        <el-form-item label="content">
          <el-input v-model="data.form.title" placeholder="完成任务"></el-input>
        </el-form-item>
        <el-form-item label="Date">
          <el-col :span="11">
            <el-date-picker
              v-model="data.form.date"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            ></el-date-picker>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="data.form.date2"
              placeholder="Pick a time"
              value-format="HH:mm:ss"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import moment from "moment";
import { MoreFilled } from '@element-plus/icons-vue'
const data = reactive({
  // timeLineList: [] as Array<any>,
  timeLineList: [],
  isNull: true,
  dialogVisible: false,
  form: {
    id: "",
    title: "",
    date: "",
    name: "",
    date2: "",
    icon: '',
    color: ''
  },
  icon: [MoreFilled],
  color: ['#0bbd87', 'green', '#409eff'],
  hollow: [true, false]
});
const handleClose = () => {
  data.dialogVisible = false;
  data.form = {}
};
const confirm = () => {
  data.isNull = false;
  let id = data.timeLineList.length;
  console.log(data.timeLineList)
  if (id % 2 == 0) {
    data.form.color = data.color[id % 3];
    data.form.hollow = data.hollow[0];
  } else {
    data.form.color = data.color[id % 3];
    data.form.icon = data.icon[0];
  }
  data.timeLineList.push(data.form);
  handleClose()
};
</script>

<style scoped>
.el-timeline {
  margin: 30px 0;
}
.add {
  margin: 5px;
  width: 200px;
}
</style>