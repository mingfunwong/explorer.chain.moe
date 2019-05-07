/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboards from 'pages/Dashboards/Loadable';
import Bps from 'pages/Bps/Loadable';
import Account from 'pages/Account/Loadable';
import Block from 'pages/Block/Loadable';
import Tx from 'pages/Tx/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { chain } from '../../utils/blockchain';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboards} />
      {chain.getArray().map((item, key) => (
        <Route
          key={key}
          exact
          path={`/${item.bindPath[0]}`}
          component={Dashboards}
        />
      ))}
      {chain.getArray().map((item, key) => (
        <Route
          key={key}
          exact
          path={`/${item.bindPath[0]}/bps`}
          component={Bps}
        />
      ))}
      {chain.getArray().map((item, key) => (
        <Route
          key={key}
          exact
          path={`/${item.bindPath[0]}/account/:accountName`}
          component={Account}
        />
      ))}
      {chain.getArray().map((item, key) => (
        <Route
          key={key}
          exact
          path={`/${item.bindPath[0]}/block/:blockNumber`}
          component={Block}
        />
      ))}
      {chain.getArray().map((item, key) => (
        <Route
          key={key}
          exact
          path={`/${item.bindPath[0]}/tx/:txHash`}
          component={Tx}
        />
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
}
