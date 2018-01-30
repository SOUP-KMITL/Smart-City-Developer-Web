import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



class AuthMiddleware extends React.Component {


    render() {
        const { userId } = this.props.userData;
        const { component, path } = this.props;

        //if (userId===undefined)
            //return <Redirect to='/signin' />;
        //else
            return <Route exact path={path} component={component} />;
    }

}

export default connect(state => state)(AuthMiddleware);
