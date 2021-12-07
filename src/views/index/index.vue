<template>
  <button class="box" @click="addNewWin()">新增一个窗口</button>
</template>

<script setup>
import electron from 'electron';
import { onMounted } from 'vue'
onMounted(() => {
  console.log(electron)
})
const addNewWin = () => {
  console.log(electron)
}
</script>
<style lang="less" scoped src="./index.less">
</style>
