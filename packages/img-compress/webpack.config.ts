/*
 * @Author: your name
 * @Date: 2021-11-19 15:32:46
 * @LastEditTime: 2021-11-19 16:02:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\img-compress\webpack.config.ts
 */
// import * as webpack from "webpack";
import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

module.exports = {
  target: "node",
  mode: "production",
  entry: "./lib/main.ts",
  output: {
    // filename: "index_[hash:8].js",
    filename: "main.js",
    path: path.resolve(__dirname, "bin"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // 需要打包的文件后缀
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.BannerPlugin({
    //   banner: "#!/usr/bin/env node",
    //   raw: true,
    //   entryOnly: true,
    //   // include: 'src/*'
    // }),
  ],
};
