import { LISTINGS_RECEIVED, LISTINGS_RECEIVED_ERROR  } from 'common/constants';
import dispatcher from 'common/dispatcher';
import API from 'common/api';

API.on('success', function(data){
  dispatcher.handleAction({
    actionType: LISTINGS_RECEIVED,
    data: data
  });
})

API.on('error', function(err){
  dispatcher.handleAction({
    actionType: LISTINGS_RECEIVED_ERROR,
    data: err
  });
})

export default {

  fetchListings: {
    start () {
      API.start();
    },

    stop () {
      API.stop();
    }
  }

};
