import React from 'react';
import { Route } from 'react-router';
import App from 'components';
import Home from 'components/Home';
import SuitRows from 'components/Seven/SuitRowsView';

export default (
    <Route name="app" component={App} path="/">
      <Route component={Home} path="/Home" />
      <Route component={SuitRows} path="/Seven" />
    </Route>
)
