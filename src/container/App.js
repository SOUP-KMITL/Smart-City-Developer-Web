import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import appRoute from '../route/route';
import MyNavbar from '../component/navbar/navbar';
import Footer from '../component/footer/footer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <MyNavbar />
        <Switch>
          { appRoute.map((route, i) => {
            return <Route exact path={route.path} component={route.component} key={i}/>;
          })}
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
