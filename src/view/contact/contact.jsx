import React from 'react';

export default class Contact extends React.Component {

    render() {
        return (
            <div className='fit-page' style={{ height: window.innerHeight - 140 }}>
                <div className='bg-contact'>
                    <p style={{ color: 'white' }}>If you have any questions, please don't hesitate to ask us on: support@smartcity.kmti.io</p>
                </div>
            </div>
        );
    }
}
