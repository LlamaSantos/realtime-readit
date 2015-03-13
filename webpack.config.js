var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = {};
paths.src = path.join(__dirname, 'client/src');
paths.build = path.join(__dirname, 'client/build');
paths.npm = path.join(__dirname, 'node_modules');

function AssetManifestPlugin(options) {
  this.options = options || {};
}

AssetManifestPlugin.prototype.apply = function(compiler){
  var manifest = {};
  var supportedFileTypes = /(js|css)/;

  function getFileType(str){
    return str.split('.').pop();
  }

  function addFileToManifest(moduleName, hashedFile){
    var fileType;

    if(Array.isArray(hashedFile))
      return hashedFile.forEach(function(n){ addFileToManifest(moduleName, n) });

    fileType = getFileType(hashedFile);

    if (supportedFileTypes.test(fileType))
      manifest[moduleName + '.' + fileType] = hashedFile;
    else
      return new Error('file type: ' + fileType + 'is not not supported by GenerateAssetManifestPlugin');
  }

  compiler.plugin('done', function(stats){
    var assetStats = stats.toJson().assetsByChunkName;

    // TODO: make this better
    Object.keys(assetStats).forEach(function(name){
      var files = assetStats[name];
      addFileToManifest(name, files);
    });

    fs.writeFileSync(path.join(paths.build, 'manifest.json'), JSON.stringify(manifest, null, 2))

  });
};


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
    new AssetManifestPlugin(),
    new webpack.DefinePlugin({})
  ],

  resolve: {
    root: [paths.npm],
    modulesDirectories: [paths.npm],
    extensions: ['', '.js', '.html', '.css', '.scss']
  }
};
