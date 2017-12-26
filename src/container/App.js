import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import appRoute from '../route/route';

class App extends Component {
  render() {
    return (
        <Switch>
          { appRoute.map((route, i) => {
            return <Route path={route.path} component={route.component} key={i}/>;
          })}
        </Switch>
    );
  }
}

export default App;
