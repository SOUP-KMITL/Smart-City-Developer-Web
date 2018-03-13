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
import MainSearchBar from '../share/component/search.jsx';
import Pagination from '../share/component/pagination.jsx';

const PAGESIZE = 10;

class MarketplaceDatacollection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataCollections: [],
            pages: {},
            loading: false
        };
        this.requestDataCollection();
    }

    componentWillReceiveProps() {
        this.requestDataCollection();
    }

    requestDataCollection() {
        const page = +this.props.match.params.page - 1;
        this.setState({ loading: true });

        axios.get(api.dataCollection + `?size=${PAGESIZE}&page=${page}`)
            .then(({ data }) => {
                this.setState({ dataCollections: data.content, pages: data });
            })
            .catch((err) => {
                console.log('CANNOT GET DATA COLLECTION');
                this.setState({ dataCollections: [] })
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }


    render() {
        const { dataCollections, pages, loading } = this.state;

        return (
            <Container>
                <Row>
                    <Col md={{ size: 4, offset: 8 }} style={{ marginTop: '40px' }}>
                        <MainSearchBar />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '40px' }}>
                    <Col md={2}></Col>
                    <Col md={8} xs={12} className=''>
                        <h3 className='content-header'>City Service</h3>
                        <hr className='content-hr' />
                        {
                            loading===true
                                ? <Loading />
                                : dataCollections.length===0
                                ? <Link to='/profile/add-datacollection' className='link'>
                                    <Button size='lg' className='btn-smooth btn-raised-success no-data'><FaPlus style={{marginTop: '5px'}} />  Data Collection</Button>
                                </Link>
                                : <MenuDataCollection dataCollections={dataCollections} match={this.props.match}/>
                        }
                        <Pagination services={pages} match={ this.props.match } linkPage='/marketplace/datacollection/page/' />
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default connect(state => state)(MarketplaceDatacollection);


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

