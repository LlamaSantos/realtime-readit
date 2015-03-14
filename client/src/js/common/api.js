import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

var API = assign({}, EventEmitter.prototype, {

  start () {
    this.source = new EventSource('/data-stream');

    this.source.addEventListener('message', function(e) {
      console.log('received message');
      console.log(arguments);
    }, false);
  },

  stop () {
    this.source.close();
  }

});

export default API;
