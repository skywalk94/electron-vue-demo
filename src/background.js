import { app, protocol, BrowserWindow, Menu, Tray } from 'electron'
const path = require('path')
const iconPath = path.join(__static, 'logo.png') // public目录下的文件
let mainWin, tray

// 取消原生menu菜单
// 调试 ctrl+shift+i
// Menu.setApplicationMenu(null)

// 必须在应用程序准备好之前注册方案
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建浏览器窗口。
async function createWindow() {
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 如果处于开发模式，则加载开发服务器的 url
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // 非开发时加载 index.html
    mainWin.loadURL('app://./index.html')
  }
  // 主页面点击关闭只进行隐藏，保留进程
  mainWin.on('close', event => {
    event.preventDefault();
    mainWin.hide()
  })
}

// 创建到系统托盘
function createTray() {
  // 显示的图标  
  tray = new Tray(iconPath)
  // 悬浮图标显示的文本
  tray.setToolTip('明知山')
  // 点击图标显示应用
  tray.on('click', () => {
    mainWin.show()
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

// 当 Electron 完成时将调用此方法
app.on('ready', async () => {
  createWindow()
  createTray()
})

// 当所有窗口都关闭时退出。
app.on('window-all-closed', (event) => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})