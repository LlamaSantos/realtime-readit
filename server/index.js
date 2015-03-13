import Hapi from 'hapi';
import stream from 'stream';
import path from 'path';
import handlebars from 'handlebars';
import reflector from './lib/reflector';

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

    reply(channel)
      .header('Content-Type', 'text/event-stream')
      .header('Cache-Control', 'no-cache')
      .header('Connection', 'keep-alive');

    let close = reflector.connect(_res);

    _req.on('close', () => {
      console.info('Client connection closed');
      close();
    });
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
