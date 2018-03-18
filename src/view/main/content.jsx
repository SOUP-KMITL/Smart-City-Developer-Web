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
import Blockies from 'react-blockies';
import axios from 'axios';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';

import './content.css';
import '../share/style.css';
import api from '../../constance/api';
import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainSearchBar from '../share/component/search.jsx';

const PAGESIZE = 5;

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
        axios.get(api.cityService + '?size=5')
            .then(({ data }) => {
                this.setState({ cityServices: data.content });
            })
            .catch((err) => {
                console.log('CANNOT GET CITY SERVICE');
                this.setState({ cityServices: [] })
            });
    }

    requestDataCollection() {
        axios.get(api.dataCollection + `?size=${PAGESIZE}`)
            .then(({ data }) => {
                this.setState({ dataCollections: data });
            })
            .catch((err) => {
                console.log('CANNOT GET DATA COLLECTION');
                this.setState({ dataCollections: [] })
            });
    }


    render() {
        const { cityServices, dataCollections } = this.state;

        return (
            <Container>

                <Row>
                    <Col md={8}></Col>
                    <Col md={4}>
                        <MainSearchBar />
                    </Col>
                </Row>

                <Row>
                    <Col md={4} xs={12} className=''>
                        {
                            this.props.userData.userId==undefined
                                ? <Link to='/signin' className='link'>
                                    <Button size='lg' block className='btn-smooth btn-raised-success'>Sign In</Button>
                                </Link>
                                :<ProfileMenu userData={ this.props.userData }/>
                        }
                    </Col>

                    <Col md={8} xs={12} className=''>
                        <h3 className='content-header'>City Service</h3>
                        <hr className='content-hr' />
                        {
                            cityServices.length==0
                                ? <Loading />
                                : <MenuCityService cityServices={cityServices} />
                        }
                        {
                            cityServices.length!=0 &&
                                <div className='more-detail'>
                                    <Link to='/marketplace/cityservice/page/1' className='link'>
                                        <Button size='sm' block className='btn-raised-success underline-none'><FaPlus /> MORE</Button>
                                    </Link>
                                </div>
                        }
                    </Col>
                </Row>

                <Row>
                    <Col md={4} xs={12}></Col>
                    <Col md={8} xs={12} className='margin-content'>
                        <h3 className='content-header'>Data Collections</h3>
                        <hr className='content-hr' />
                        {
                            dataCollections.length==0
                                ? <Loading />
                                : <MenuDataCollection dataCollections={dataCollections.content} />
                        }
                        {
                            dataCollections.length!=0 &&
                                <div className='more-detail'>
                                    <Link to='marketplace/datacollection/page/1' className='link'>
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

const MenuCityService = ({ cityServices }) => (
    cityServices!=[] && cityServices.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={4} className='mymenu-header'>
                        {
                            item.thumbnail==null
                                ? <Blockies
                                    seed={item.owner}
                                    size={7}
                                    scale={10}
                                    color='#DC90DD'
                                    bgColor='#F0F0F0'
                                    spotColor='#77C5D4'
                                />
                                : <img
                                    className='img-fluid'
                                    src={ item.thumbnail }
                                    alt={item.serviceName}
                                />
                        }
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={10} className='mymenu-content'>
                        <Link to={`/view/cityservice/${item.serviceId}`} className='black'>
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
                        {
                            item.thumbnail=='' || item.thumbnail==null
                                ? <Blockies
                                    seed={ item.owner }
                                    size={7}
                                    scale={10}
                                    color='#DC90DD'
                                    bgColor='#F0F0F0'
                                    spotColor='#77C5D4'
                                />
                                : <img
                                    className='img-fluid'
                                    src={ item.thumbnail }
                                    alt={ item.collectionName }
                                />
                        }
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={10} className='mymenu-content'>
                        <Link to={`/view/datacollection/${item.collectionName}`} className='black'>
                            <strong>{ item.collectionName }</strong>
                        </Link>
                        <p className='mymenu-description'>{item.description}</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)
