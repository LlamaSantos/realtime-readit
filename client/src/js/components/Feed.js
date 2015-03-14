import React from 'react';
import store from 'common/store'
import actions from 'common/actions'

export default React.createClass({
  getInitialState () {
    return {
      listings: store.getListings()
    };
  },

  componentDidMount () {
    store.addChangeListener(this._onChange);
    actions.fetchListings.start();
  },

  componentWillUnmount () {
    store.removeChangeListener(this._onChange);
    actions.fetchListings.stop();
  },


  _onChange () {
    this.setState({
      listings: store.getListings()
    })
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
