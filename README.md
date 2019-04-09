# webpack-electron
Webpack4 + Electron + React 脚手架

## Dependencies

```bash
# electron
# electron安装3以上版本避免electron-updater报错“this.app.whenReady is not a function”
npm install -g electron

# packages
npm install
```

## Run

```bash
# development
# use sourceMap while compiling to see error message in code in development environment.
# set sourceMap false in uglifyjs-webpack-plugin. tip: set parallel true can help improve the speed of compiling
npm run dev

# watch
# set --watch of webpack in scripts in package.json to help online compiling.
npm run watch

# start
npm start

# production
npm run pro

# use electron-builder to pack the application
# tip: please use "npm install electron-builder" to avoid the error "Unresolve node modules: react"
npm run builder
```