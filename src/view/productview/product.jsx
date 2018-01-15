import React from 'react';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGithub from 'react-icons/lib/fa/github';
import FaGooglePlus from 'react-icons/lib/fa/google-plus';

import MainRightPanel from '../share/right-panel.jsx';
import MainSearchBar from '../share/search.jsx';
import './product.css';


export default class Product extends React.Component {

    createMarkup(text) {
        return {
            __html: text
        };
    };


    render() {
        const text = `<h4><a href=''>Support html <i>text</i> </a></h4> Information and communication technology (ICT) is used to enhance quality, performance and interactivity of urban services, to reduce costs and resource consumption and to increase contact between citizens and government. Smart city applications are developed to manage urban flows and allow for real-time responses. A smart city may therefore be more prepared to respond to challenges than one with a simple 'transactional' relationship with its citizens. Yet, the term itself remains unclear to its specifics and therefore, open to many interpretations.  `;

        return (
            <Container className='content'>
                <Row>
                    <Col md={{ size: 4, offset: 8 }}>
                        <MainSearchBar />
                    </Col>
                </Row>

                <Row>
                    <Col md={4} xs={12} className='right-menu order-md-8'>
                        <MainRightPanel />
                    </Col>
                    <Col md={8} xs={12} className='order-md-4'>

                        <div className='img-product'>
                            <img
                                src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg'
                                className='img-fluid img-thumbnail'
                            />
                        </div>
                        <h3 className='product-header'>Template: Sticky</h3>
                        <div className='product-header-description'>
                            <p><FaCalendarO color='#56b8db' /> 01/01/2018</p>
                            <p><FaUser color='#56b8db' /> Admin</p>
                        </div>
                        <hr />

                        <div dangerouslySetInnerHTML={this.createMarkup(text)} />
                        <hr />

                        <Link to=''><span>Share this</span></Link>
                        <div className='share-button'>
                            <ButtonGroup>
                                <Button size='sm' className='btn-facebook'><FaFacebook /></Button>
                                <Button size='sm' className='btn-facebook'> Facebook </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button size='sm' className='btn-github'><FaGithub /></Button>
                                <Button size='sm' className='btn-github'> Github </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button size='sm' className='btn-google'><FaGooglePlus /></Button>
                                <Button size='sm' className='btn-google'> Google+ </Button>
                            </ButtonGroup>
                        </div>

                        <div className='tag'>
                            <Link to=''><i>#IOT</i></Link>
                            <Link to=''><i>#Strong_Watch</i></Link>
                            <Link to=''><i>#Smart_watch</i></Link>
                            <Link to=''><i>#Watch_light</i></Link>
                        </div>

                </Col>
            </Row>
        </Container>
        );
    }
}
