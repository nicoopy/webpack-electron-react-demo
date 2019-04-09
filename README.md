# webpack-electron
Webpack4 + Electron + React + 打包(electron-builder) + 版本更新（electron-updater）

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
npm run builder

# preview
# make a new file dev-app-update.yml to test electron-update in "development", content is the same as lastest.yml in server/build/.
npm start
```
