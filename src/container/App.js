import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

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

  componentDidMount() {
    this.props.initNotify(this.notify);
  }

  notify = (content, type, timeout=2500) => {
    if(type == 'success')
      toast.success(content, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: timeout
      })
    else if(type == 'error')
      toast.error(content, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: timeout
      })
    else if(type == 'warning')
      toast.warn(content, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: timeout
      });

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
                  return (
                    <Route
                      path={route.path}
                      render={
                        (props) => <AuthMiddleware component={route.component} path={route.path} params={props.match} />
                      }
                      key={i}
                    />
                  )
                else if (route.requirePublic===true)
                  return  <Route path={route.path} render={ () => <PublicMiddleware component={route.component} path={route.path} /> } key={i} />;
                else if (route.redirect===true)
                  return <Route render={() => <Redirect to={route.to} />} key={i}/>;
                else
                  return <Route exact={route.exact} path={route.path} component={route.component} key={i}/>;
              })
            }
          </Switch>
          <ToastContainer />
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
      });
    },
    initNotify: (notify) => {
      dispatch({
        type: 'INIT',
        payload: notify
      });
    },
  }
}

export default withRouter(connect(state => state, mapDispatchToProps)(App));
