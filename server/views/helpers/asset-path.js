var fs = require('fs'),
    path = require('path');

var manifestPath = path.join(__dirname, '../../../client/build/manifest.json'),
    assetManifest = {};

fs.readFile(manifestPath, 'utf8', function (err, data) {
  if (err) return console.log(err);
  assetManifest = JSON.parse(data);
});

module.exports = function(assetPath) {
  return assetManifest[assetPath];
};
