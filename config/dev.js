const Uglify = require('uglifyjs-webpack-plugin');
const base = require('./base');

base.mode = 'development';
base.plugins.push(new Uglify({
    sourceMap: true,
    // parallel: true
}));

module.exports = base;
