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
    Card,
    Button,
    CardTitle,
    CardText,
} from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import './content.css';
import api from '../../constance/api';

class Content extends Component {

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
        this.requestData();
    }

    requestData() {
        fetch(api.cityService, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ cityServices: res.data });
                    console.log(this.state.cityServices);
                });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    dateFormat(value) {
        const date = new Date(value);
        const format = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
        return format;
    }

    render() {
        const { cityServices, dataBuckets } = this.state;
        return (
            <Container>
                <Row>
                    <Col md={{ size: 4, offset: 8 }}>
                        <InputGroup className='searchbar'>
                            <Input placeholder="Search..." />
                            <InputGroupAddon><MdSearch /></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>

                    <Col md={8} xs={12}>
                        <h3>City Service</h3>
                        <hr />

                        { cityServices.map((item, i) => {
                            return (
                                <Container key={i}>
                                    <Row className='mymenu'>
                                        <Col lg={4} md={12} sm={12} xs={12} className='mymenu-header'>
                                            <img className='mymenu-img' src='https://image.shutterstock.com/z/stock-vector-smart-city-concept-with-different-icon-and-elements-modern-city-design-with-future-technology-for-374763079.jpg' alt='test' />
                                        </Col>

                                        <Col lg={8} md={12} sm={12} xs={12} className='mymenu-content'>
                                            <h4>{ item.serviceName }</h4>
                                            <div className='mymenu-header-footer'>
                                                <FaCalendarO className='mymenu-icon'/>
                                                <span style={{ marginRight: '16px' }}>{ this.dateFormat(item.timestamp) }</span>
                                                <FaUser className='mymenu-icon'/>
                                                <span>{ item.owner }</span>
                                            </div>
                                            <hr />
                                            <p className='mymenu-description'>
                                                A smart city is an urban area that uses different types of electronic data collection sensors to supply information used to manage assets and resources efficiently. This includes data collected from citizens, devices, and assets that is processed and analyzed to monitor and manage traffic and transportation systems, power plants, water supply networks, waste management, law enforcement, information systems, schools, libraries, hospitals, and other community services. The smart city concept integrates information and communication technology (ICT), and various physical devices connected to the network (the Internet of things or IoT) to optimize the efficiency of city operations and services and connect to citizens. Smart city technology allows city officials to interact directly with both community and city infrastructure and to monitor what is happening in the city and how the city is evolving.
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            );
                        })}
                    </Col>

                    <Col md={4} xs={12}>

                        <Nav tabs className='nav-tab'>
                            <NavItem>
                                <NavLink
                                    className={({ active: this.state.activeTab === '1' })}
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
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <div className='media media-border'>
                                            <img src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6' class='img-thumbnail media-img' />
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
                                <Row>
                                    <Col sm="12">
                                        <div className='media media-border media-bordertop'>
                                            <img src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6' class='img-thumbnail media-img' />
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
                                <Row>
                                    <Col sm="12">
                                        <div className='media media-border media-bordertop'>
                                            <img src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6' class='img-thumbnail media-img' />
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
                            </TabPane>

                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>

                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Content;
