import React from 'react';
import { RouteHandler } from 'react-router';

import Header from 'components/Header'

export default React.createClass({
  render () {
    return (
      <div className="container">
        <Header />
        <RouteHandler />
      </div>
    );
  }
});
