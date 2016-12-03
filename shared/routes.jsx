import React from 'react';
import { Route } from 'react-router';
import App from 'components';
import Home from 'components/Home';
import SevenView from 'components/Seven/SevenView';

export default (
    <Route name="app" component={App} path="/">
      <Route component={Home} path="/Home" />
      <Route component={SevenView} path="/Seven/:roomId/:playerId"/>
    </Route>
)
