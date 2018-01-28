import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



class PublicMiddleware extends React.Component {


    render() {
        const { userId } = this.props.userData;
        const { component, path } = this.props;

        if (userId===undefined)
            return <Route exact path={path} component={component} />;
        else
            return <Redirect to='/profile' />;
    }

}

export default connect(state => state)(PublicMiddleware);
