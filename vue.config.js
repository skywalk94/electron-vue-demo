module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: '明知山',
                appId: 'com.electron.iapex',
                copyright: '',
                compression: 'store', // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
                // directories: {
                //   output: 'build' // 输出文件夹
                // },
                win: {
                    // icon: 'xxx/icon.ico',
                    target: ['nsis', 'zip']
                },
                nsis: {
                    oneClick: false, // 一键安装
                    // guid: 'xxxx', // 注册表名字，不推荐修改
                    perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    installerIcon: './build/icons/icon.ico', // 安装图标
                    uninstallerIcon: './build/icons/icon.ico', // 卸载图标
                    installerHeaderIcon: './build/icons/icon.ico', // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    shortcutName: '明知山' // 图标名称
                }
            }
        }
    },
}