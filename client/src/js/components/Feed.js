import React from 'react';
import store from 'common/store'
import actions from 'common/actions'

import MagicMove from 'MagicMove';

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
      <MagicMove>
        {this.state.listings.map((item) => {
          return (
            <div className="listing" key={item.id}>
              <p><a href={'//reddit.com' + item.permalink}>{item.title}</a></p>
              <p>{item.num_comments}</p>
            </div>
          );
        })}
      </MagicMove>
    );
  }
});
