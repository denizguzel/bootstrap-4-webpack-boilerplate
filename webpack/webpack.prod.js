const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const relativePath = path.resolve(__dirname, '../');

module.exports = merge(common, {
  output: {
    path: relativePath + '/prod',
    filename: 'bundle.js'
  },
  mode: 'production',
  plugins: [
    new UglifyJsPlugin(), //minify everything
    new AggressiveMergingPlugin(), //Merge chunks
    new CleanWebpackPlugin(['prod'], {
      root: relativePath
    })
  ]
});
