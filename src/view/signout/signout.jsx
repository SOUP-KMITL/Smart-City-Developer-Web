import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Storage from '../../view/share/authorization/storage.jsx';


class Signout extends React.Component {

    componentDidMount() {
        Storage.removeUserData();
        this.props.removeUserData();
    }

    render() {
        return (
            <Redirect to='/signin' />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        removeUserData: () => {
            dispatch({
                type: 'REMOVE',
            })
        }
    }
}

export default connect(state => state, mapDispatchToProps)(Signout);
