import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import classnames from 'classnames';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';

import './content.css';
import '../share/style.css';
import api from '../../constance/api';
import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainSearchBar from '../share/component/search.jsx';

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cityServices: [],
            dataCollections: []
        };
    }

    componentWillMount() {
        this.requestCityService();
        this.requestDataCollection();
    }

    requestCityService() {
        fetch(api.cityService, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ cityServices: res });
                },
                (err) => {
                    console.log('NOT FOUND 404 CityServices');
                })
            .catch((err) => {
                console.log(this.state.cityServices);
                this.setState({ cityServices: [] })
            })
    }

    requestDataCollection() {
        fetch(api.dataCollection, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ dataCollections: res });
                },
                (err) => {
                    console.log('NOT FOUND 404 dataCollections');
                })
            .catch((err) => {
                console.log(this.state.dataCollections);
                this.setState({ dataCollections: [] })
            })
    }


    render() {
        const { cityServices, dataCollections } = this.state;

        return (
            <Container>
                <Row>
                    <Col md={{ size: 4, offset: 8 }}>
                        <MainSearchBar />
                    </Col>
                </Row>

                <Row>
                    <Col md={4} xs={12} className='right-menu order-md-8'>
                        {
                            this.props.userData.userId==undefined
                                ? <Link to='/signin' className='link'>
                                    <Button size='lg' block className='btn-smooth btn-raised-success'>Sign In</Button>
                                </Link>
                                :<ProfileMenu userData={ this.props.userData }/>
                        }
                    </Col>

                    <Col md={8} xs={12} className='order-md-4'>
                        <h3 className='content-header'>City Service</h3>
                        <hr className='content-hr' />
                        {
                            cityServices.length==0
                                ? <Loading />
                                : <MenuCityService cityServices={cityServices} />
                        }
                        {
                            cityServices.length==[] &&
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
                        <h3 className='content-header'>Data Collections</h3>
                        <hr className='content-hr' />
                        {
                            dataCollections.length==0
                                ? <Loading />
                                : <MenuDataCollection dataCollections={dataCollections} />
                        }
                        {
                            dataCollections.length==[] &&
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

export default connect(state => state)(Content);


const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)

const getCssType = (value, index) => {
    return classnames( 'mymenu', {
        'border-hr-type-a': value==='a',
        'border-hr-type-b': value==='b',
        'border-hr-type-c': value==='c',
    });
}

const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';

const MenuCityService = ({ cityServices }) => (
    cityServices!=[] && cityServices.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={4} className='mymenu-header'>
                        <img
                            className='img-fluid'
                            src={ item.icon!=''? item.icon: noImageAvialable }
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
                        <p className='mymenu-description'>{ item.description }</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)


const MenuDataCollection = ({ dataCollections }) => (
    dataCollections!=[] && dataCollections.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={4} className='mymenu-header'>
                        <img
                            className='img-fluid'
                            src={ item.icon!='' && item.icon!='icon'? item.icon: noImageAvialable }
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
                        <p className='mymenu-description'>{item.description}</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)
