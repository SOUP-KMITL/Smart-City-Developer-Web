import React from 'react';
import { connect } from 'react-redux';


class EditCityService extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {
        return (
            <h1>Hello</h1>
        );
    }
}

export default connect(state => state)(EditCityService);
