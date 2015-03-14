import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

import { CHANGE_EVENT, LISTINGS_RECEIVED } from 'common/constants';
import dispatcher from 'common/dispatcher';

var _cache = {
  listings: []
};

var addListings = function (newListings) {
  _cache.listings = newListings;
}

var store = assign({}, EventEmitter.prototype, {
  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getListings: function(){
    return _cache.listings;
  }
});

dispatcher.register((payload) => {
  var action = payload.action;

  switch(action.actionType){
    case LISTINGS_RECEIVED:
      addListings(action.data);
      store.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default store;
