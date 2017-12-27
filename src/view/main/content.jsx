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
import './content.css';
import api from '../../constance/api';

class Content extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
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
                    <Col md={8}>
                        <h1>Hello</h1>
                    </Col>
                    <Col md={4}>
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
                                            <div className='mdia-content'>
                                                <strong>header</strong>
                                                <p className='ellipsis'>ccontentcontentcontentcontentcontentontent</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12">
                                        <div className='media media-border media-bordertop'>
                                            <img src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6' class='img-thumbnail media-img' />
                                            <div className='mdia-content'>
                                                <strong>header</strong>
                                                <p className='ellipsis'>ccontentcontentcontentcontentcontentontent</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12">
                                        <div className='media media-bordertop'>
                                            <img src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6' class='img-thumbnail media-img' />
                                            <div className='mdia-content'>
                                                <strong>header</strong>
                                                <p className='ellipsis'>ccontentcontentcontentcontentcontentontent</p>
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
