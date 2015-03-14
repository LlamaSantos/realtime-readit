import Hapi from 'hapi';
import stream from 'stream';
import path from 'path';
import handlebars from 'handlebars';
import reflector from './lib/reflector';
import reddit from './lib/reddit';

//reddit.monitor((err, payload) =>{
//  if (err) {
//    console.error("Error1: ", err);
//  } else {
//    console.info("Data Received: ", payload);
//  }
//});

let server = new Hapi.Server();
server.connection({ port: process.env.PORT || 8081 });

server.views({
  engines: {
    'html': {
      module: handlebars,
      compileMode: 'sync'
    }
  },
  compileMode: 'async',
  relativeTo: __dirname,
  path: './views',
  layout: 'application',
  layoutPath: './views/layouts',
  helpersPath: './views/helpers'
});

server.route({
  method: 'GET',
  path: '/data-stream',
  handler (req, reply) {
    let channel = new stream.PassThrough
    let _req = req.raw.req;
    let _res = req.raw.res;

    _res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    _req.on('close', reflector.connect(_res));
  }
});

// Serve assets
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join(__dirname, '../client/build')
    }
  }
});

// Serve initial page
server.route({
  method: 'GET',
  path:'/',
  handler (request, reply) {
    reply.view('index');
  }
});

export default server;
