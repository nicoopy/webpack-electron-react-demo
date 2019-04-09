import React, { Component } from 'react';
import './index.less';

const electron = require('electron');

const {remote} = electron;
const path = require('path');

let currentUpdateEvent;
let currentVersion;
let timer1;

class Index extends Component {
  constructor() {
    super();

    this.win = null;
  }

  componentDidMount() {
    const ulElement = document.getElementById('content');
    electron.ipcRenderer.on('message', (event, { message, data }) => {
      console.log(message);
      const messageMap = {
        error: '更新出错，请尝试重新更新',
        'checking-for-update': '正在检查更新..',
        'update-available': '发现可用更新安装包',
        'update-not-available': '未发现可用更新，当前版本已是最新版本',
        downloadProgress: '更新安装包开始进行下载',
        isUpdateNow: '更新安装包下载完成，可开始更新',
      };
      if ((currentUpdateEvent && currentUpdateEvent !== message) || !currentUpdateEvent) {
        currentUpdateEvent = message;

        const newElement = document.createElement('li');
        newElement.innerHTML =
          `${messageMap[message] +
          ((data !== undefined && `<div>最新版本:${  data.version  }</div>`) || '') +
          ((data !== undefined &&
            `<div>文件大小:${  (data.files[0].size / 1024 / 1024).toFixed(0)  }MB</div>`) ||
            '') +
          ((data !== undefined && `<div>版本更新时间:${  data.releaseDate  }</div>`) || '') 
          }<br />`;
        ulElement.appendChild(newElement);

        if (message === 'update-available') {
          currentVersion = data.version;
        }
        if (message === 'isUpdateNow') {
          timer1 = setTimeout(() => {
            if (confirm(`electron有新的版本${currentVersion}发布，是否现在更新？`)) {
              electron.ipcRenderer.send('updateNow');
            }
            clearTimeout(timer1);
          }, 500);
        }
      }
    });
  }

  handleClick = () => {
    this.win = new remote.BrowserWindow({
      width: 400,
      height: 300,
    });

    const pageUrl = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
    this.win.loadURL(pageUrl);

    this.win.on('close', () => {
      this.win = null;
    });
  };

  autoUpdate = () => {
    // 向主进程发送“update”
    electron.ipcRenderer.send('update');
  };

  render() {
    return (
      <div className="p-index">
        <button type="button" onClick={this.autoUpdate}>检查更新</button>
        <ul id="content">
          <p>生命周期过程展示:</p>
        </ul>
      </div>
    );
  }
}

export default Index;
