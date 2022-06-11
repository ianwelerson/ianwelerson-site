const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // TODO: add this plugin to plugin array

module.exports = (env) => {
  const environment = env.production ? 'production' : 'development'

  return {
    mode: environment,
    devtool: environment === 'production' ? 'source-map' : 'eval-cheap-source-map',
    entry: path.resolve(__dirname, './src/assets/js/entry.js'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/assets/')
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      assetModuleFilename: "[name].[hash][ext]",
      filename: 'main.[hash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        inject: 'body',
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css' //TODO: change this to dinamic
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            "css-loader",
            "sass-loader"
          ],
        },
        {
            test: /\.(html)$/,
            use: ['html-loader']
        }
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './src'),
      },
      hot: true,
      port: 8000,
    },
  }
};