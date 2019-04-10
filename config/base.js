const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');

const outputPath = path.resolve(__dirname, '../dist');

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/pages/index.js'),
        anotherPage: path.resolve(__dirname, '../src/pages/anotherPage.js')
    },
    output: {
        path: outputPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all"
                }
            }
        }
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react", "stage-0"
                        ],
                        plugins: [
                            ["import", { "libraryName": "antd", "style": "css" }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: ExtractTextPlugin.loader,
                        options: {
                            publicPath: `${outputPath  }/css`
                        }
                    },
                    {   loader: 'css-loader'   },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]',
                            publicPath: outputPath
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            title: 'Index',
            template: 'src/tpl.html',
            chunks: ['common', 'index'],
            chunksSortMode: 'manual',
            filename: 'index.html'
        }),
        new HtmlPlugin({
            title: 'AnotherPage',
            template: 'src/tpl.html',
            chunks: ['common', 'anotherPage'],
            chunksSortMode: 'manual',
            filename: 'anotherPage.html'
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
};
