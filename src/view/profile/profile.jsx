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

import profileRoute from '../../route/profile.route.js';
import './profile.css';


class Profile extends React.Component {


    render() {
        return (
            <Container className='fullscreen' style={{ paddingTop: 50 }}>
                <Row>

                    <Col md={3} xs={12} sm={12}>
                        <LeftProfileMenu userData={ this.props.userData }/>
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



const LeftProfileMenu = ({userData}) => (
    <div>
        <div className='profile-image'>
            <img
                src='https://pickaface.net/assets/images/slides/slide4.png'
                width='200px'
                className='img-fluid'
                alt=''
            />
        </div>
        <div className='profile-info'>
            <strong>@{userData.userName}</strong>
            <p>{userData.firstName} {userData.lastName}</p>
        </div>
        <ListGroup className='profile-menu'>
            <ListGroupItem>
                <Link to='/profile'>Edit Profile</Link>
            </ListGroupItem>
            <ListGroupItem>
                <Link to='/profile/my-datacollections'>
                    My DataCollections
                </Link>
            </ListGroupItem>
            <ListGroupItem>
                <Link to='/profile/my-cityservices'>
                    My CityServices
                </Link>
            </ListGroupItem>
            <ListGroupItem>
                <Link to='/signout'>
                    Sign Out
                </Link>
            </ListGroupItem>
    </ListGroup>
</div>
)
