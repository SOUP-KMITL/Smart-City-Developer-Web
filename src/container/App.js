import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import appRoute from '../route/route';
import MyNavbar from '../component/navbar/navbar';
import Footer from '../component/footer/footer.jsx';
import Storage from '../view/share/authorization/storage.jsx';
import AuthMiddleware from '../view/share/authorization/authMiddleware.jsx';
import PublicMiddleware from '../view/share/authorization/publicMiddleware.jsx';

class App extends Component {

  async componentWillMount() {
    const userData = await Storage.getUserData();
    if (userData)
      this.props.updateUserData(userData);
  }

  render() {
    return (
      <div>
        <MyNavbar />
        <div className='body'>
          <Switch>
            {
              appRoute.map((route, i) => {
                if (route.requireLogin===true)
                  return  <Route path={route.path} render={ (props) => <AuthMiddleware component={route.component} path={route.path} params={props.match} /> } key={i} />
                else if (route.requirePublic===true)
                  return  <Route path={route.path} render={ () => <PublicMiddleware component={route.component} path={route.path} /> } key={i} />
                else
                  return <Route exact path={route.path} component={route.component} key={i}/>;
              })
            }
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (data) => {
      dispatch({
        type: 'UPDATE',
        payload: data
      })
    }
  }
}

export default connect(state => state, mapDispatchToProps)(App);
