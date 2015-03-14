import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

var API = assign({}, EventEmitter.prototype, {

  start () {
    this.source = new EventSource('/data-stream');

    this.source.addEventListener('message', (e) => {
      this.emit('success', JSON.parse(e.data));
    }, false);
  },

  stop () {
    this.source.close();
  }

});

export default API;
