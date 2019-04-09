const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

let win, webContents;
// 远程更新包位置
const feedUrl = "http://127.0.0.1:5000/build";

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    const indexPageURL = `file://${__dirname}/dist/index.html`;
    win.loadURL(indexPageURL);

    webContents = win.webContents;

    // 打开应用即检查更新
    // checkForUpdates();

    win.on('closed', () => {
        win = null
    });
}

const checkForUpdates = () => {
    // 配置安装包远程服务器
    autoUpdater.setFeedURL(feedUrl);

    // 自动更新的生命周期中的事件
    autoUpdater.on('error', (msg) => {
        sendUpdateMessage('error', msg);
    });
    autoUpdater.on('checking-for-update', (msg) => {
        sendUpdateMessage('checking-for-update', msg);
    });
    autoUpdater.on('update-available', (msg) => {
        sendUpdateMessage('update-available', msg);
    });
    autoUpdater.on('update-not-available', (msg) => {
        sendUpdateMessage('update-not-available', msg);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', (progressObj) => {
        sendUpdateMessage('downloadProgress', progressObj);
    });

    // 更新下载完成事件
    autoUpdater.on('update-downloaded', () => {
        sendUpdateMessage('isUpdateNow');
        ipcMain.on('updateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        });
    });

    // 执行自动检查更新操作
    autoUpdater.checkForUpdates();
};

// 主进程发消息给渲染进程
function sendUpdateMessage(message, data) {
    console.log({ message, data });
    webContents.send('message', { message, data });
}

// 主进程监听渲染进程传来的信息
ipcMain.on('update', (e, arg) => {
    console.log('update');
    checkForUpdates();
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (!win) {
        createWindow();
    }
});
