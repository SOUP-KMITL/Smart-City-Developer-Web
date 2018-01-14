import React, { Component } from 'react';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Row,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import classnames from 'classnames';

// Icons
import MdSearch from 'react-icons/lib/md/search';
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import './content.css';
import api from '../../constance/api';

export default class Content extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
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

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { cityServices, dataBuckets } = this.state;

        return (
            <Container>
                <SearchBar />

                <Row>
                    <Col md={4} xs={12} className='right-menu order-md-8'>
                        <Nav tabs className='nav-tab'>
                            <NavItem>
                                <NavLink
                                    className={({ active: this.state.activeTab === '1'})}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    {'popular'.toUpperCase()}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    { 'recent'.toUpperCase() }
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab} className='tab-content'>
                            <TabPane tabId='1'>
                                <TabpaneMenu size={3} />
                            </TabPane>
                            <TabPane tabId='2'>
                                <TabpaneMenu size={2} />
                            </TabPane>
                        </TabContent>
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
                            <Link to=''>
                                <div className='more-detail'>
                                    <div class='more-detail-left'></div>
                                    <FaChevronCircleDown
                                        size={45}
                                        color='#6B6B6B'
                                        className='more-detail-icon'
                                    />
                                    <div class='more-detail-right'></div>
                                </div>
                            </Link>
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
                    </Col>

                    <Col md={4} xs={12}>
                        {/*Some content in right panel here*/}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const SearchBar = () => (
    <Row>
        <Col md={{ size: 4, offset: 8 }}>
            <InputGroup className='searchbar'>
                <Input placeholder="Search..." />
                <InputGroupAddon><MdSearch /></InputGroupAddon>
            </InputGroup>
        </Col>
    </Row>
)


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
        'border-hr-type-a': value=='a',
        'border-hr-type-b': value=='b',
        'border-hr-type-c': value=='c',
    });
}

const MenuCityService = ({ cityServices }) => (
    cityServices.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col lg={4} md={4} sm={4} xs={12} className='mymenu-header'>
                        <img className='img-fluid mymenu-img' src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg' alt='test' />
                    </Col>

                    <Col lg={8} md={8} sm={8} xs={12} className='mymenu-content'>
                        <h4>{ item.serviceName }</h4>
                        <div className='mymenu-header-footer'>
                            <FaCalendarO className='mymenu-icon'/>
                            <span style={{ marginRight: '16px' }}>{ dateFormat(item.timestamp) }</span>
                            <FaUser className='mymenu-icon'/>
                            <span>{ item.owner }</span>
                        </div>
                        <hr />
                        <p className='mymenu-description'> Information and communication technology (ICT) is used to enhance quality, performance and interactivity of urban services, to reduce costs and resource consumption and to increase contact between citizens and government. Smart city applications are developed to manage urban flows and allow for real-time responses. A smart city may therefore be more prepared to respond to challenges than one with a simple "transactional" relationship with its citizens. Yet, the term itself remains unclear to its specifics and therefore, open to many interpretations.  </p>
                        <Link to='/' className='link'>
                            <Button color='info' size='sm' outline className='readmore'>Continue reading...</Button>
                        </Link>
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
                    <Col lg={4} md={12} sm={4} xs={12} className='mymenu-header'>
                        <img className='img-fluid mymenu-img' src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg' alt='test' />
                    </Col>

                    <Col lg={8} md={12} sm={8} xs={12} className='mymenu-content'>
                        <h4>{ item.collectionName }</h4>
                        <div className='mymenu-header-footer'>
                            <FaCalendarO className='mymenu-icon'/>
                            <span style={{ marginRight: '16px' }}>{ dateFormat(item.timestamp) }</span>
                            <FaUser className='mymenu-icon'/>
                            <span>{ item.owner }</span>
                        </div>
                        <hr />
                        <p className='mymenu-description'> sl</p>
                        <Link to='/' className='link'><Button color='info' size='sm' outline className='readmore'>Continue reading...</Button></Link>
                    </Col>
                </Row>
            </Container>
        );
    })
)


const TabpaneMenu = ({ size }) => (
    [...Array(size)].map((item, i) => {
        return (
            <Row>
                <Col sm="12">
                    <div className={`media ${i!==size-1? 'media-border': ''} media-bordertop`}>
                        <img
                            src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6'
                            className='img-thumbnail media-img'
                            alt=''
                        />

                    <div className='media-content'>
                        <strong>header</strong>
                        <p className='mymenu-header-footer'>
                            <FaCalendarO className='mymenu-icon'/>
                            <span style={{ marginRight: '16px' }}> 01/01/2018</span>
                            <FaUser className='mymenu-icon'/>
                            <span> Admin</span>
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
        )
    })
)



