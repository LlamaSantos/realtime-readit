import redis from 'redis';
import { List, Map } from 'immutable';

const info = console.info.bind(console, 'INFO: ');
const error = console.error.bind(console, 'ERROR: ');
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
  info(`Message Received on '${channel}'`);
  clients.forEach((c) => {
    c.write(`event: message\n`);
    c.write(`data: ${message}\n\n`);
  });
});

client.on('error', function (err) {
  error(err);
  process.exit(-1);
});

export default {
  connect(response) {

    info('Client connected.');
    clients = clients.concat(response);

    return () => {
      info('Client disconnected');

      response.end();
      clients = clients.filter((c) => c !== response);
    };
  }
}
