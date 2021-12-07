<template>
  <button class="box" @click="addNewWin()">新增一个窗口</button>
  <p>111111111111</p>
</template>

<script setup>
import electron from 'electron'
import { onMounted } from 'vue'
const BrowserWindow = electron.remote.BrowserWindow

onMounted(() => {

})

const addNewWin = () => {
  let href = window.location.href
  let win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  })
  win.loadURL(`${href}mine`);
}
</script>
<style lang="less" scoped src="./index.less">
</style>
