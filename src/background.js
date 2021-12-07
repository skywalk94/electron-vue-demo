import { app, protocol, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const logo = path.join(__static, './img/logo.png') // public目录下的文件
const icon = path.join(__static, './img/icon.png')
let mainWindow, tray

// 生产模式取消原生menu菜单
// 调试 ctrl+shift+i
if (!isDevelopment) {
  Menu.setApplicationMenu(null)
}

// 必须在应用程序准备好之前注册方案
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建浏览器窗口。
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: logo,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 如果处于开发模式，则加载开发服务器的 url
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // 非开发时加载 index.html
    mainWindow.loadURL('app://./index.html')
  }

  // 主页面点击关闭只进行隐藏，保留进程
  mainWindow.on('close', event => {
    event.preventDefault();
    mainWindow.hide()
  })
}

// 创建到系统托盘
function createTray() {
  // 显示的图标  
  tray = new Tray(logo)
  // 悬浮图标显示的文本
  tray.setToolTip('明知山')
  // 点击图标显示应用
  tray.on('click', () => {
    stopFlash()
    mainWindow.show()
  })
  //右键图标，出现的菜单
  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出程序',
        click: () => app.exit()
      }
    ])
    tray.popUpContextMenu(contextMenu)
  })
}

// 监听渲染进程发布的指令
ipcMain.on('tray-flash', (event, arg) => {
  flashTray()
})

// 系统托盘图标闪烁
let timer
function flashTray() {
  let count = 0;
  timer = setInterval(() => {
    count++;
    if (count % 2 == 0) {
      tray.setImage(logo)
    } else {
      tray.setImage(icon)
    }
  }, 500)
}

// 系统托盘图标停止闪烁
function stopFlash() {
  tray.setImage(logo)
  clearInterval(timer)
}

// 当 Electron 完成时将调用此方法
app.on('ready', async () => {
  createWindow()
  createTray()
})

// 只能打开一个应用窗口
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}

// 当所有窗口都关闭时退出。
app.on('window-all-closed', (event) => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

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