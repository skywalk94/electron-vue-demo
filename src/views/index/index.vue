<template>
  <button class="box" @click="addNewWin()">新增一个窗口</button>
  <button @click="flashTray()">系统图标闪烁</button>
</template>

<script setup>
import { remote, ipcRenderer } from 'electron'
import { onMounted } from 'vue'
const BrowserWindow = remote.BrowserWindow

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
const flashTray = () => {
  ipcRenderer.send('tray-flash')
}
</script>
<style lang="less" scoped src="./index.less">
</style>
