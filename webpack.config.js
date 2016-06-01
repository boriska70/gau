var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
//  externals: [nodeExternals()], //do not include node modules (not core). problematic - we need react* at least
  debug: true,
  devtool: 'eval-source-map',  //bigger package but better for debugging
  //devtool: 'source-map', //smaller package but worse for debugging
  entry: './index.js',
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath:'/'
  },
/*  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],*/
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee'],
    modulesDirectories: ['./modules','./node_modules']
  }
};