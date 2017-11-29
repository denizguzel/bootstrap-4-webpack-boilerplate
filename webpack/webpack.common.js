const path = require('path');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const relativePath = path.resolve(__dirname, '../');

const postcssLoader = {
  loader: 'postcss-loader', // postcss loader so we can use autoprefixer
  options: {
    config: {
      path: './postcss.config.js'
    }
  }
};

module.exports = {
  context: relativePath,
  entry: [
    './node_modules/font-awesome/css/font-awesome.css',
    '@babel/polyfill',
    './src/js/index.js'
  ],
  output: {
    path: relativePath + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: function (module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.s?css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader' // translates CSS into CommonJS modules
            },
            postcssLoader,
            {
              loader: 'sass-loader' // compiles SASS to CSS
            }
          ]
        })
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      }
    ]
  }
};
