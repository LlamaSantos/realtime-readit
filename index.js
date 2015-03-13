require('dotenv').load();
require('babel/register');
var server = require('./server/index.js')

server.start(function() {
  console.info('Server running at: ' + this.info.uri);
}.bind(server));
