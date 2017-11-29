const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const relativePath = path.resolve(__dirname, '../');

module.exports = merge(common, {
  watch: true,
  devtool: 'source-map',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      server: 'dist'
    }, {
      reload: true,
      open: true
    }),
    new CleanWebpackPlugin(['dist'], {
      root: relativePath
    })
  ]
});
