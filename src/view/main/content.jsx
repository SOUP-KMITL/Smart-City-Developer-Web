import React, { Component } from 'react';
import {
    Container,
    Col,
    Row,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import classnames from 'classnames';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import './content.css';
import '../share/style.css';
import api from '../../constance/api';
import MainRightPanel from '../share/right-panel.jsx';
import MainSearchBar from '../share/search.jsx';

export default class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            cityServices: [],
            dataBuckets: []
        };
    }

    componentWillMount() {
        this.requestCityService();
        this.requestDataBucket();
    }

    requestCityService() {
        fetch(api.cityService, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ cityServices: res.data });
                });
    }

    requestDataBucket() {
        fetch(api.dataBucket, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ dataBuckets: res.data });
                });
    }


    render() {
        const { cityServices, dataBuckets } = this.state;

        return (
            <Container>
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
                        <h3 className='content-header'>City Service</h3>
                        <hr className='content-hr' />
                        {
                            cityServices.length===0
                                ? <Loading />
                                : <MenuCityService cityServices={cityServices} />
                        }
                        {
                            <div className='more-detail'>
                                <Link to='' className='link'>
                                    <Button size='sm' block className='btn-raised-success underline-none'><FaPlus /> MORE</Button>
                                </Link>
                            </div>
                        }
                    </Col>
                </Row>

                <Row>
                    <Col md={8} xs={12} className='margin-content'>
                        <h3 className='content-header'>Data Bucket</h3>
                        <hr className='content-hr' />
                        {
                            cityServices.length===0
                                ? <Loading />
                                : <MenuDataBucket dataBuckets={dataBuckets} />
                        }
                        {
                            <div className='more-detail'>
                                <Link to='' className='link'>
                                    <Button size='sm' block className='btn-raised-success underline-none'><FaPlus /> MORE</Button>
                                </Link>
                            </div>
                        }
                    </Col>

                    <Col md={4} xs={12}>
                        {/*Some content in right panel here*/}
                    </Col>
                </Row>
            </Container>
        );
    }
}



const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)

const dateFormat = (value) => {
    const date = new Date(value);
    const format = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    return format;
}

const getCssType = (value, index) => {
    return classnames( 'mymenu', {
        'border-hr-type-a': value==='a',
        'border-hr-type-b': value==='b',
        'border-hr-type-c': value==='c',
    });
}

const MenuCityService = ({ cityServices }) => (
    cityServices.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={4} className='mymenu-header'>
                        <img
                            className='img-fluid'
                            src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg'
                            alt='test'
                        />
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={10} className='mymenu-content'>
                        <Link to='/product/{{ item.serviceName }}' className='black'>
                            <strong>{ item.serviceName }</strong>
                        </Link>
                        <p className='mymenu-description'> Information and communication technology (ICT) is used to enhance quality, performance and interactivity of urban services, to reduce costs and resource consumption and to increase contact between citizens and government. Smart city applications are developed to manage urban flows and allow for real-time responses. A smart city may therefore be more prepared to respond to challenges than one with a simple "transactional" relationship with its citizens. Yet, the term itself remains unclear to its specifics and therefore, open to many interpretations.  </p>
                    </Col>
                </Row>
            </Container>
        );
    })
)


const MenuDataBucket = ({ dataBuckets }) => (
    dataBuckets.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={4} className='mymenu-header'>
                        <img
                            className='img-fluid'
                            src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg'
                            alt='test'
                        />
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={10} className='mymenu-content'>
                        <Link to='/product/{{ item.serviceName }}' className='black'>
                            <strong>{ item.collectionName }</strong>
                        </Link>
                        <p className='mymenu-description'> A neural network that transforms a screenshot into a static website</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)
