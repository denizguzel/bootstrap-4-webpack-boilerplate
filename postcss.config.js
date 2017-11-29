module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('cssnano')({
      discardComments: { removeAll: true }
    }),
  ]
};