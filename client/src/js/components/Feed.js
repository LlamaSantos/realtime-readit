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
      <div className="media-list">
        {(this.state.listings||[]).map((item) => {
          return (
            <div className="thing spacer media" key={item.id}>
              <div className="thing--media left">
                <img className="media-object" src={item.thumbnail} />
              </div>

              <div className="thing--votes left">
                <div className="media-object">
                  <div className="thing--votes--arrow up">Ups: {item.ups}</div>
                  <div className="thing--votes--score">{item.score}</div>
                  <div className="thing--votes--arrow down">Downs: {item.downs}</div>
                </div>
              </div>

              <div className="thing--entry media-body">

                <h3 className="thing--title">
                  <a href={'//reddit.com' + item.permalink}>{item.title}</a>{' '}
                  <span className="thing--link-label">{item.subreddit}</span>{' '}
                </h3>
                <p className="thing--tagline">{new Date(item.created)}</p>
                <ul className="thing--controls">
                  <li className="thing--controls--comments">
                    <a href={'//reddit.com' + item.permalink}>{item.num_comments} comments</a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});
