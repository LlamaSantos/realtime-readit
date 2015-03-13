import Hapi from 'hapi';
import stream from 'stream';

let server = new Hapi.Server();
server.connection({ port: process.env.PORT || 8081 });

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

server.start(() => {
  console.info(`Server running at: ${server.info.uri}`);
});
