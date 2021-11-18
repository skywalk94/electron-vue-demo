'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

//取消原生menu菜单
// Menu.setApplicationMenu(null)

//设置当前应用程序的名字
app.setName("明知山")
// 必须在应用程序准备好之前注册方案
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // 创建浏览器窗口。
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 使用 pluginOptions.nodeIntegration，不要管它
      // 参见 nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration 了解更多信息
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 如果处于开发模式，则加载开发服务器的 url
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // 非开发时加载 index.html
    win.loadURL('app://./index.html')
  }
}

// 当所有窗口都关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，应用程序及其菜单栏很常见
  // 保持活动状态，直到用户使用 Cmd + Q 明确退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 macOS 上，在应用程序中重新创建一个窗口是很常见的
  // 停靠图标被点击，没有其他窗口打开。
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 当 Electron 完成时将调用此方法
// 初始化并准备好创建浏览器窗口。
// 有的API只有在这个事件发生后才能使用。
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // 安装 Vue 开发工具
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// 在开发模式下根据父进程的请求干净地退出。
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
