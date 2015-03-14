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
    let channel = new stream.PassThrough;

    reply(channel)
      .code(200)
      .type('text/event-stream')
      .header('Connection', 'keep-alive')
      .header('Cache-Control', 'no-cache');

    req.raw.req.on('close', reflector.connect(channel));
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
