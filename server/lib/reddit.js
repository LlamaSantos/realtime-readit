'use strict';

import uuid from 'uuid';
import redis from 'redis';
import axios from 'axios';
import { List } from 'immutable';

const info = console.info.bind(console, 'INFO: ');
const error = console.error.bind(console, 'ERROR: ');
const channel = 'reddit';

let fetch = (reply) => {
  axios.get('https://www.reddit.com/.json').then((res) => {
    if (res.data && res.data.data) {
      let results =
        List(res.data.data.children)
          .filter((i) => !!i.data)
          .map((i) => {
            let r = i.data;
            return {
              domain:       r.domain,
              over_18:      r.over_18,
              created:      r.created,
              title:        r.title,
              subreddit:    r.subreddit,
              id:           r.id,
              thumbnail:    r.thumbnail,
              score:        r.score,
              permalink:    r.permalink,
              num_comments: r.num_comments,
              ups:          r.ups,
              downs:        r.downs,
              author:       r.author,
            };
          }
        );

      reply(null, results);
    }
  }).catch((error) => {
    reply(error, {});
  });
};

let id = null;
let monitors = List();

let update = (err, data) => {
  monitors.forEach((obj) => {
    obj.fn(err, data);
  });
};

let run = () => {
  if (id) return;

  info('Starting to read data from reddit');

  setInterval(function() {
    fetch((err, list) => {

      if (err) {
        error("we didn't publish", err);
      } else {
        client.publish(channel, JSON.stringify(list.toJS()));
      }

      update(err, list);
    })
  }, 500);
};

let cancel = () => {
  clearInterval(id);
  id = null;
};

var client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_URL);

client.auth(process.env.REDIS_SECRET, (err) => {
  if (err) {
    error(err);
    process.exit(-1);
  } else {
    info('Redis authentication successful');
  }

  run();
});


export default {
  monitor(fn) {
    var id = uuid();
    monitors = monitors.concat({id, fn});
    return id;
  },
  unmonitor(id) {
    monitors = monitors.filter((m) => m.id !== id);
  },
  cancel, run
};
