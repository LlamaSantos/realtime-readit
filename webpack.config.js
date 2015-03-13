var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = {};
paths.src = path.join(__dirname, 'client/src');
paths.build = path.join(__dirname, 'client/build');
paths.npm = path.join(__dirname, 'node_modules');

module.exports = {
  entry: {
    app: [
      path.join(paths.src, 'js/app.js'),
      path.join(paths.src, 'css/app.scss')
    ]
  },

  output: {
    path: paths.build,
    filename: '[name].[hash].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?experimental&optional=runtime'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({})
  ],

  resolve: {
    root: [paths.npm],
    modulesDirectories: [paths.npm],
    extensions: ['', '.js', '.html', '.css', '.scss']
  }
};
