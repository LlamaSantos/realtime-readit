import { LISTINGS_RECEIVED, LISTINGS_RECEIVED_ERROR  } from 'common/constants';
import dispatcher from 'common/dispatcher';
import API from 'common/api';

var dummyData = [
  { id: 1,  title: 'Justo Condimentum Malesuada Pharetra Quam' },
  { id: 2,  title: 'Ullamcorper Amet Euismod Sollicitudin Justo' },
  { id: 3,  title: 'Bibendum Sem Mollis Lorem Malesuada' },
  { id: 4,  title: 'Elit Fusce Venenatis Nullam Cursus' },
  { id: 5,  title: 'Condimentum Sollicitudin Consectetur Ullamcorper Pellentesque' },
  { id: 6,  title: 'Malesuada Ullamcorper Adipiscing Parturient Aenean' },
  { id: 7,  title: 'Sollicitudin Quam Fermentum Risus Pharetra' },
  { id: 8,  title: 'Fermentum Etiam Pellentesque Tellus Commodo' },
  { id: 9,  title: 'Ullamcorper Malesuada Amet Tellus Mattis' },
  { id: 10, title: 'Amet Cursus Ridiculus Quam Ornare' }
];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

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

var inter = setInterval(function(){
  dispatcher.handleAction({
    actionType: LISTINGS_RECEIVED,
    data: shuffle(dummyData)
  });
}, 1000)

setTimeout(function(){
  window.clearInterval(inter);
}, 10000)

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
