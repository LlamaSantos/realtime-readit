import { LISTINGS_RECEIVED, LISTINGS_RECEIVED_ERROR  } from 'common/constants';
import dispatcher from 'common/dispatcher';

var API = {

  load (success, failure) {
    setTimeout(function() {
      success([{id: 1, title: 'title'}, {id: 2, title: 'next title'}]);
    }, 1000);
  }

};


export default {

  fetchListings: {
    start () {
      let onSuccess = function(response) {
        dispatcher.handleAction({
          actionType: LISTINGS_RECEIVED,
          data: response
        });
      };

      let onError = function(err) {
        dispatcher.handleAction({
          actionType: LISTINGS_RECEIVED_ERROR,
          data: err
        });
      };

      API.load(onSuccess, onError);
    },

    stop () {
      console.log('fetchListings#stop - we should maybe implement this');
    }
  }

};
