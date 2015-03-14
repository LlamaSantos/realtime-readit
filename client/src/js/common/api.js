import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

var dummyData = [
  { id: 1, title: 'Ipsum Cursus Venenatis Etiam' },
  { id: 2, title: 'Nullam Nibh Pharetra Vulputate' }
];

var API = assign({}, EventEmitter.prototype, {

  start () {
    setTimeout(() => {
      this.emit('success', dummyData);
    }, 1000);
  },

  stop () {
    console.log('stop api');
  }

});

export default API;
