import React from 'react';
import { Route } from 'react-router';
import App from 'components';
import Home from 'components/Home';
import SuitRow from 'components/Seven.Suitrow';

export default (
    <Route name="app" component={App} path="/">
      <Route component={Home} path="/Home" />
      <Route component={SuitRow} rowName="DIAMOND" path="/Seven" />
    </Route>
)
