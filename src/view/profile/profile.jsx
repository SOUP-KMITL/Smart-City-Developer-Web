import React from 'react';
import {
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileMenu from './profileMenu/profileMenu.jsx';
import profileRoute from '../../route/profile.route.js';
import './profile.css';


class Profile extends React.Component {


    render() {
        return (
            <Container className='fullscreen' style={{ paddingTop: 50 }}>
                <Row>

                    <Col md={3} xs={12} sm={12}>
                        <ProfileMenu userData={ this.props.userData }/>
                    </Col>

                    <Col md={1} xs={12} sm={12}>
                        <hr className='vertical' />
                    </Col>

                    <Col md={{ size: 7 }} sm={12}>
                        <Switch>
                            {
                                profileRoute.map((route, i) => {
                                    if (this.props.match.url=='/profile'+route.path)
                                        return <Route exact path={this.props.match.url} component={route.component} key={i} />;
                                    else if (route.redirect===true)
                                        return <Route render={() => <Redirect to={route.to} />} key={i} />;
                                })
                            }
                        </Switch>
                    </Col>

                </Row>
            </Container>
        );
    }
}


export default connect(state => state)(Profile);
