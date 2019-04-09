const express = require('express');
const app = express();

app.use(express.static(__dirname));

// 在本地启动服务是为了验证electron-updater的功能
// tip: 将每次打包好的build文件夹放在server目录下
app.listen('5000', 'localhost', () => {
    console.log('local server start at port 5000');
});