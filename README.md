# webpack-electron
Webpack4 + Electron + React + antd + 打包(electron-builder) + 版本更新（electron-updater）

## Dependencies

```bash
# electron安装3以上版本避免electron-updater报错“this.app.whenReady is not a function”
npm install -g electron

# packages
npm install
```

## Run

```bash
# build
npm run dev or npm run watch

# start
npm start
```

## Commands

```bash
# development
# use sourceMap while compiling to see error message in code in development environment.
# set sourceMap false in uglifyjs-webpack-plugin. tip: set parallel true can help improve the speed of compiling
npm run dev

# watch
# set --watch of webpack in scripts in package.json to help online compiling.
npm run watch

# production
npm run pro

# use electron-builder to pack the application
# tip: please use "npm install electron-builder" to avoid the error "Unresolve node modules: react"
# 打包时需新建一个 /build/script/installer.nsh 文件，否则electron-builder会报错
npm run builder

# preview
# make a new file dev-app-update.yml to test electron-update in "development", content is the same as lastest.yml in server/build/.
npm start
```
## Example
![example:](https://github.com/Nicoopy/webpack-electron-react-demo/raw/master/src/assets/img/example1.png)
![example:](https://github.com/Nicoopy/webpack-electron-react-demo/raw/master/src/assets/img/example2.png)
![example:](https://github.com/Nicoopy/webpack-electron-react-demo/raw/master/src/assets/img/example3.png)

##Problem
electon-update 在mac环境下，由于缺少 code signature, 会报错"could not get code signature for running application",需自行上网查找解决方案
