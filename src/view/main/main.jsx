import React, { Component } from 'react';

import MainCarousel from './carousel.jsx';
import Content from './content';

class Main extends Component {

    render() {
        return (
            <div>
                {
                    this.props.location.pathname==='/' && <MainCarousel />
                }
                <div className='content'>
                    <Content />
                </div>
            </div>
        );
    }
}


export default Main;
