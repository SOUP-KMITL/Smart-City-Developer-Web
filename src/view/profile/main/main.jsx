import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import FaPlus from 'react-icons/lib/fa/plus';
import Blockies from 'react-blockies';
import axios from 'axios';

import api from '../../../constance/api.js';

const PAGESIZE = 6;

class MainProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            cityServices: [],
            dataCollections: [],
            loading: {
                dataCollection: false,
                cityService: false
            }
        };

        if (props.userData.accessToken != undefined) {
            this.requestCityService(props);
            this.requestDataCollection(props);
        }
    }

    componentWillReceiveProps(props) {
        if (props.userData.accessToken != undefined) {
            this.requestCityService(props);
            this.requestDataCollection(props);
        }
    }

    requestCityService(props) {
        const { userName } = props.userData;
        // Update object state
        this.state.loading.cityService = true;

        axios.get(api.cityService + `?size=${PAGESIZE}`, {
            headers: {
                'Authorization': props.userData.accessToken
            }
        })
            .then(({ data }) => {
                this.setState({ cityServices: data.content });
            })
            .catch(({ response }) => {
                this.props.notify('CANNOT GET CITY SERVICE', 'error');
                this.setState({ cityServices: [] })
            })
            .finally(() => {
                const loading = Object.assign({}, this.state.loading.cityService);
                loading.cityService = false;
                this.setState({ loading });
            });
    }

    requestDataCollection(props) {
        const { userName } = props.userData;
        // Update object state
        this.state.loading.dataCollection = true;

        axios.get(api.dataCollection + `?owner=${userName}&size=${PAGESIZE}`)
            .then(({ data }) => {
                this.setState({ dataCollections: data.content });
            })
            .catch(({ response }) => {
                this.props.notify('CANNOT GET DATA COLLECTION');
                this.setState({ dataCollections: [] })
            })
            .finally(() => {
                const loading = Object.assign({}, this.state.loading.dataCollection);
                loading.dataCollection = false;
                this.setState({ loading });
            });
    }


    render() {
        const { cityServices, dataCollections, loading } = this.state;
        return (
            <div>
                <div>
                    <h3 className='content-header'>City Service</h3>
                    <hr className='content-hr' />
                    {
                        loading.cityService===true
                            ? <Loading />
                            : cityServices.length==0
                            ? <Link to='/profile/add-cityservice' className='link'>
                                <Button size='lg' className='btn-smooth btn-raised-success no-data'>+ ADD CITY SERVICE</Button>
                            </Link>
                            : <MenuCityService cityServices={cityServices} />
                    }
                </div>

                <div>
                    <h3 className='content-header'>Data Collections</h3>
                    <hr className='content-hr' />
                    {
                        loading.dataCollection===true
                            ? <Loading />
                            : dataCollections.length==0
                            ? <Link to='/profile/add-datacollection' className='link'>
                                <Button size='lg' className='btn-smooth btn-raised-success no-data'>+ ADD DATA COLLECTION</Button>
                            </Link>
                            : <MenuDataCollection dataCollections={dataCollections} />
                    }

                </div>
            </div>
        );
    }
}

export default connect(state => state)(MainProfile);


const getCssType = (value, index) => {
    return classnames( 'mymenu', {
        'border-hr-type-a': value==='a',
        'border-hr-type-b': value==='b',
        'border-hr-type-c': value==='c',
    });
}

const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';


const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)

const MenuDataCollection = ({ dataCollections }) => (
    dataCollections!=[] && dataCollections.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={3} className='mymenu-header'>
                        {
                            item.thumbnail=='' || item.thumbnail==null
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
                                    src={  item.thumbnail }
                                    alt={ item.collectionName }
                                />
                        }
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={9} className='mymenu-content'>
                        <Link to={`/profile/my-datacollections/datacollection/${item.collectionId}`} className='black'>
                            <strong>{ item.collectionName }</strong>
                        </Link>
                        <p className='mymenu-description'>{item.description}</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)

const MenuCityService = ({ cityServices }) => (
    cityServices!=[] && cityServices.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={3} className='mymenu-header'>
                        {
                            item.thumbnail=='' || item.thumbnail==null
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
                                    alt={ item.collectionName }
                                />
                        }
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={9} className='mymenu-content'>
                        <Link to={`/profile/my-cityservices/cityservice/${item.serviceId}`} className='black'>
                            <strong>{ item.serviceName }</strong>
                        </Link>
                        <p className='mymenu-description'>{ item.description }</p>
                    </Col>
                </Row>
            </Container>
        );
    })
)
