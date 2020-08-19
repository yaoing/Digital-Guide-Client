const { app,ipcMain, BrowserWindow,Menu,shell,dialog } = require('electron')


let win

var windowState = {};

try {

    windowState = global.nodeStorage.getItem('windowstate');

} catch (err) {

    // the file is there, but corrupt. Handle appropriately.

}

app.commandLine.appendSwitch("--disable-http-cache");


function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        // frame:false,
        transparent:true,
        resizable: false,
        show:false,
        radius: [5, 5, 5, 5],
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
        }})

    win.setMenu(null)
    win.maximize()
    // win.webContents.openDevTools()

    
    win.loadFile('index.html')   
    



    win.on('closed', () => {

        win = null
    })

    win.show()

    
}

app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})




ipcMain.on('minWin',e=>win.minimize())
ipcMain.on('closeWin',e=>win.close())

const isDevelopment = false;
if (isDevelopment) {
    /* eslint-disable */

    require('electron-reload')(__dirname, {
        electron: require('${__dirname}/../../node_modules/electron'),
    });
}

