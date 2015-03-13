import redis from 'redis';
import { List, Map } from 'immutable';

const info = console.info.bind(console, 'INFO:\t');
const error = console.error.bind(console, 'ERROR:\t');
const channel = 'reddit';

let clients = List();
let client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_URL);

client.auth(process.env.REDIS_SECRET, (err) => {
  if (err) {
    error(err);
    process.exit(-1);
  } else {
    info('Redis authentication successful');
  }

  info("Subcribing to the channel", client.subscribe(channel));
});

client.on('message', function (channel, message) {
  info("Message received, ", message);
  clients.forEach((c) => {
    c.socket.write(`${message}\n`);
  });
});

client.on('error', function (err) {
  error(err);
  process.exit(-1);
});

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
