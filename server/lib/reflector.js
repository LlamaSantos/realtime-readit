import redis from 'redis';
import { List, Map } from 'immutable';

const info = console.info.bind(console, 'INFO:\t');

info('Creating connection to redis');
const channel = 'reddit';
let client = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  secret: process.env.REDIS_SECRET
});

let clients = List();

info('Creating subscription to message');
client.on('message', function (channel, message) {
  clients.forEach((c) => {
    c.socket.write(message);
  });
});

info('Handling errors');
client.on('error', function (err) {
  console.error('ERROR:\t', err);
  process.exit(-1);
});

info('Actually subscribing');
info(client.subscribe(channel));



export default {
  logging: true,
  connect(socket) {

    info('Client connected.');
    clients = clients.concat(socket);

    return () => {
      if (this.logging)
        info('Client disconnected');

      socket.end();
      clients = clients.filter((c) => c !== socket);
    };
  }
}
