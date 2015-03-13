import {EventEmitter} from 'events';
import assign from 'react/lib/Object.assign';

import constants from 'common/constants';
import dispatcher from 'common/dispatcher';

const CHANGE_EVENT = 'change';

var store = assign({}, EventEmitter.prototype, {
  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

dispatcher.register((payload) => {
  var action = payload.action;
  return true
});

export default store;
