const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
   entry: { main: './src/components/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',
      publicPath: '',
   },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      // Обработка JS с Babel
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // Обработка CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // Обработка изображений
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Обработка шрифтов
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // Генерация HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // Очистка папки dist перед сборкой
    new CleanWebpackPlugin(),
    // Извлечение CSS в отдельный файл
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true, // Минификация
    minimizer: [
      new CssMinimizerPlugin(), // Минификация CSS
    ],
  },
};
