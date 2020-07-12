const projectName = "w-map";
const outPath = "build";
const debugPath = "dist";
const path = require('path');
const webpack = require('webpack');
const ExTextPlg = require("extract-text-webpack-plugin");

var DEBUG = true;
if(process.env.NODE_ENV == 'production'){
    DEBUG = false;
}

module.exports = {
    entry: {
        dalitree:'dalitree'
    },
    output: {
        path: path.resolve(__dirname, DEBUG?debugPath:outPath), // 输出的路径
       // publicPath: '/icommunity-overview/', // 输出的路径
        sourceMapFilename: 'maps/[name].map',
        filename: '[name].js'  // 打包后文件
    },
    devtool: DEBUG ? 'inline-source-map':"inline-source-map",
    devServer: {
        contentBase: debugPath, //本地服务器所加载的页面所在的目录
        port: 7687,
        host: '127.0.0.1',
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        hot: true, // 开启热重载
      //  sockHost: 'http://0.0.0.0:8888/icommunity-overview/sockjs-node',
       // disableHostCheck: true,
    
    },
    resolve: {
        extensions: ['.js', '.ts'],
        mainFiles:["index", "default"] ,
        alias: {
            dalitree: path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
    　　　　    use: 'ts-loader',
    　　　　　　exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExTextPlg.extract({
                    use: ['css-loader', 'less-loader']
                  })
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                exclude: /node_modules/,
                options: {
                    name: './images/[name].[ext]',
                    limit: 10192
                }
            }
        ]
    },
    plugins: [
        new ExTextPlg("[name].css")
    ]
}