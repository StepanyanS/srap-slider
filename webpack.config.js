const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),

  entry: {
    'srap-slider': './js/srap-slider.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  watch: true
}

module.exports = webpackConfig;