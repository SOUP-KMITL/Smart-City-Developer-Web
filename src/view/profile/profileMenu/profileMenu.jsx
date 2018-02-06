import React from 'react';
import {
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

export default ({userData}) => (
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
            <div className='link'>
                <Button size='sm' outline color='info' className='btn-smooth'>Gen Access Token</Button>
            </div>
        </div>
        <ListGroup className='profile-menu'>
            <ListGroupItem>
                <Link to='/profile'>My Account</Link>
            </ListGroupItem>
            <ListGroupItem>
                <Link to='/profile/my-datacollections/page/1'>
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
