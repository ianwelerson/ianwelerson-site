const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // TODO: add this plugin to plugin array

module.exports = (env) => {
  const environment = env.production ? 'production' : 'development'

  return {
    mode: environment,
    devtool: environment === 'production' ? 'source-map' : 'eval-cheap-source-map',
    entry: path.resolve(__dirname, 'src', 'entry.js'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/assets/')
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: "[name].[hash][ext]",
      filename: 'main.[hash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new CopyPlugin({
        patterns: [
          path.resolve(__dirname, 'src', 'sitemap.xml'),
        ]
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
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      hot: true,
      port: 8000,
    },
  }
};