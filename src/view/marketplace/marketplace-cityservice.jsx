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

import '../main/content.css';
import api from '../../constance/api';
import Pagination from '../share/component/pagination.jsx';
import Loading from '../share/component/loading.jsx';
import MainSearchBar from '../share/component/search.jsx';


const PAGESIZE = 10;

class MarketplaceCityservice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cityServices: [],
            pages: {},
            loading: true
        };
        this.requestCityService(props);
    }

    componentWillReceiveProps(props) {
        this.requestCityService(props);
    }

    requestCityService(props) {
        const page = +props.match.params.page - 1;
        this.setState({ loading: true });

        axios.get(api.cityService + `?size=${PAGESIZE}&page=${page}`)
            .then(({ data }) => {
                this.setState({ cityServices: data.content, pages: data });
                console.log(data);
            })
            .catch((err) => {
                console.log('CANNOT GET CITY SERVICE');
                this.setState({ cityServices: [] })
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }


    render() {
        const { cityServices, pages, loading } = this.state;

        if (loading === true)
            return ( <Loading /> )
        else
            return (
                <Container>
                    <div className='searchbar'>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8} xs={12}>
                                <MainSearchBar />
                            </Col>
                        </Row>
                    </div>

                    <Row style={{ marginBottom: '40px', paddingTop: '40px' }}>
                        <Col md={2}></Col>
                        <Col md={8} xs={12} className=''>
                            <h3 className='content-header'>City Services</h3>
                            <hr className='content-hr' />
                            {
                                loading===true
                                    ? <Loading />
                                    : cityServices.length===0
                                    ? <h3>No service</h3>
                                    : <MenuCityService cityServices={cityServices} />
                            }
                            <Pagination services={pages} match={ this.props.match } linkPage='/marketplace/cityservice/page/' />
                        </Col>
                    </Row>

                </Container>
            );
    }
}

export default connect(state => state)(MarketplaceCityservice);


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
