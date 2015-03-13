import React from 'react';

var getListings = () => {
  return [
    {id: 1, title: 'Tortor Ridiculus Aenean Vehicula Ultricies'},
    {id: 2, title: 'Bibendum Sollicitudin Inceptos Aenean Vulputate'},
    {id: 3, title: 'Pharetra Lorem Egestas Ornare Euismod'}
  ];
};

export default React.createClass({
  getInitialState () {
    return {
      listings: getListings()
    };
  },


  render () {
    return (
      <ul>
        {this.state.listings.map((item) => {
          return (
            <li key={item.id}>{item.title}</li>
          );
        })}
      </ul>
    );
  }
});
