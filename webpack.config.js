const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: 'srap-slider.min.css'
});

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),

  entry: ['./js/srap-slider.js'],
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'srap-slider.min.js',
      publicPath: '/dist'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader",
        })
      }
    ]
},

plugins: [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }),
  extractSass
],

  watch: true,
  devtool: 'source-map'
}

module.exports = webpackConfig;