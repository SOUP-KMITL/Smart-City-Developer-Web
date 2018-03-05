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
import Blockies from 'react-blockies';


// Icon
import FaPlus from 'react-icons/lib/fa/plus';

import api from '../../../constance/api.js';
import Pagination from '../../share/component/pagination.jsx';

const PAGESIZE = 10;

class MyCityServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cityServices: [],
            pages: {}
        }
        this.requestCityService(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData != undefined)
            this.requestCityService(props);
    }

    requestCityService({ userData, match }) {
        const page = +match.params.page - 1;
        this.setState({ loading: true });

        fetch(api.cityService + `?size=${PAGESIZE}&page=${page}`, { method: 'GET' })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.setState({ cityServices: res.content, pages: res });
                },
                (err) => {
                    console.log('NOT FOUND 404 CityServices');
                })
            .catch((err) => {
                console.log(this.state.cityServices);
                this.setState({ cityServices: [] })
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }


    render() {
        const { cityServices, loading, pages } = this.state;
        return (
            <div>
                <h3 className='content-header'>City Service</h3>
                {
                    cityServices.length!==0 &&
                        <Link to='/profile/add-cityservice' className='link'>
                            <Button size='sm' className='btn-smooth btn-raised-success content-header-btn no-data'><FaPlus style={{marginTop: '3px'}} />  CitService</Button>
                        </Link>
                }
                <hr className='content-hr' />
                {
                    loading===true
                        ? <Loading />
                        : cityServices.length===0
                        ? <Link to='/profile/add-cityservice' className='link'>
                            <Button size='lg' className='btn-smooth btn-raised-success no-data'><FaPlus style={{marginTop: '5px'}} />  CityService</Button>
                        </Link>
                        : <MenuCityService cityServices={cityServices} />
                }

                <Pagination services={pages} match={ this.props.match } linkPage='/profile/my-cityservices/page/' />
            </div>
        );
    }
}

export default connect(state => state)(MyCityServices);

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
                    <Col md={3} className='mymenu-header'>
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

const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)
