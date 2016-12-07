import React from 'react';
import { Route } from 'react-router';
import App from 'components';
import Home from 'components/Home';
import SevenView from 'components/Seven/SevenView';
import ChatView from 'components/ChatView';

export default (
    <Route name="app" component={App}>
      <Route component={SevenView} path="/7spade/:roomId/:playerId"/>
    </Route>
)
