import React from 'react';
import { DefaultRoute, Route } from 'react-router';

import Container from 'components/Container';
import Home from 'components/Home';

export default (
  <Route name="app" path="/" handler={Container}>
    <DefaultRoute handler={Home} />
  </Route>
);
