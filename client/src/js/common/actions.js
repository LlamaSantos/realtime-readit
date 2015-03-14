import constants from 'common/constants';
import dispatcher from 'common/dispatcher';

export default {
  addListings (newListings){
    dispatcher.handleAction({
      actionType: constants.ADD_LISTINGS,
      data: newListings
    });
  },
};
