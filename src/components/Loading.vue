<template>
  <div class="loading">
    <img src="../assets/loading.svg" alt="拼命加载中..." />
  </div>
</template>
<script >
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingCustom",
});
</script>
<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 30px; */
}
</style>
