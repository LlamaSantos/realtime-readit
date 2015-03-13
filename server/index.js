import Hapi from 'hapi';
import stream from 'stream';
import path from 'path';
import handlebars from 'handlebars';

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
    let raw = req.raw.req;
    // -- Keep the connection open and don't timeout.
    raw.socket.setTimeout(Infinity);

    setTimeout(() => {
      channel.write('Hello\n');
      console.info('writing data...');
    }, 100)

    reply(channel)
      .header('Content-Type', 'text/event-stream')
      .header('Cache-Control', 'no-cache')
      .header('Connection', 'keep-alive');

    raw.on('close', () => {
      console.info('Client connection closed');
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
