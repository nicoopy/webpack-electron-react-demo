import React, { Component } from 'react';
import { Modal, Button, List } from 'antd';
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
    this.state = {
      sourceData: []
    };
  }

  componentDidMount() {
    const { sourceData } = this.state;
    electron.ipcRenderer.on('message', (event, { message, data }) => {
      const messageMap = {
        'error': '更新出错，请尝试重新更新',
        'checking-for-update': '正在检查更新...',
        'update-available': '发现可用更新安装包',
        'update-not-available': '未发现可用更新，当前版本已是最新版本',
        'downloadProgress': '更新安装包开始进行下载',
        'isUpdateNow': '更新安装包下载完成，可开始更新',
      };
      if ((currentUpdateEvent && currentUpdateEvent !== message) || !currentUpdateEvent) {
        currentUpdateEvent = message;

        sourceData.push(
          `${messageMap[message] +
          ((data !== undefined && `【最新版本:${  data.version  }，`) || '') +
          ((data !== undefined &&
            `文件大小:${  (data.files[0].size / 1024 / 1024).toFixed(0)  }MB，`) ||
            '') +
          ((data !== undefined && `版本更新时间:${  data.releaseDate  }】`) || '')
          }`
        );
        this.setState({
          sourceData
        });

        if (message === 'update-available') {
          currentVersion = data.version;
        }
        if (message === 'isUpdateNow') {
          timer1 = setTimeout(() => {
            Modal.confirm({
              title: 'Confirm',
              content: `electron有新的版本${currentVersion}发布，是否现在更新？`,
              okText: '确定',
              cancelText: '取消',
              onOk: () => {
                electron.ipcRenderer.send('updateNow');
              }
            });
            clearTimeout(timer1);
          }, 500);
        }
      }
    });
  }

  gotoAnothoerPage = () => {
    this.win = new remote.BrowserWindow({
      width: 400,
      height: 300
    });

  const pageUrl = path.join('file://', remote.app.getAppPath(), 'dist/anotherPage.html');
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
    const { sourceData } = this.state;
    return (
      <div className="p-index">
        <Button type="primary" style={{ margin: "10px 0 10px 0" }} onClick={this.autoUpdate}>检查更新</Button>
        <Button style={{ margin: "10px 0 10px 10px" }} onClick={this.gotoAnothoerPage}>跳转页面</Button>
        <List
          size="large"
          header={<div>生命周期过程展示：</div>}
          bordered
          dataSource={sourceData}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    );
  }
}

export default Index;
