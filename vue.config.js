let productName = "明知山"
module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: productName, // 应用名称
                appId: 'com.electron.iapex',
                win: {
                    icon: 'build/icons/icon.ico', // win图标 尺寸256 * 256
                    artifactName: "${productName}-${version}.${ext}", // 应用名-版本-文件后缀
                    target: ['nsis']
                },
                mac: {
                    icon: 'build/icons/icon.icns', // mac图标
                    artifactName: "${productName}-${version}.${ext}",
                    target: ['dmg']
                },
                linux: {
                    icon: 'build/icons/', // linux图标
                },
                nsis: {
                    oneClick: false, // 是否一键安装
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    perMachine: true,  //为当前系统的所有用户安装该应用程序
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                }
            }
        }
    },
}