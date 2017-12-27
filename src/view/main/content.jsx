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
                            <Input placeholder="username" />
                            <InputGroupAddon><MdSearch /></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h1>Hello</h1>
                    </Col>
                    <Col md={4}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Tab1
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Moar Tabs
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 1 Contents</h4>
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
