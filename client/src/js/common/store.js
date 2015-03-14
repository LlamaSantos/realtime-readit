import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

import { CHANGE_EVENT, ADD_LISTINGS } from 'common/constants';
import dispatcher from 'common/dispatcher';

var _cache = {
  listings: [
    {id: 1, title: 'Tortor Ridiculus Aenean Vehicula Ultricies'},
    {id: 2, title: 'Bibendum Sollicitudin Inceptos Aenean Vulputate'},
    {id: 3, title: 'Pharetra Lorem Egestas Ornare Euismod'}
  ]
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
    case ADD_LISTINGS:
      addListings(action.data);
      store.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default store;
