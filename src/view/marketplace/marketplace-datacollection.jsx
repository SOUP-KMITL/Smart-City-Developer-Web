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

class SearchDatacollection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataCollections: [],
            pages: {},
            loading: true
        };
        this.requestDataCollection(props);
    }

    componentWillReceiveProps(props) {
        this.requestDataCollection(props);
    }

    requestDataCollection(props) {
        const page = +props.match.params.page - 1;
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
                            <h3 className='content-header'>Data Collections</h3>
                            <hr className='content-hr' />
                            {
                                loading===true
                                    ? <Loading />
                                    : dataCollections.length===0
                                    ? <h3>No collection</h3>
                                    : <MenuDataCollection dataCollections={dataCollections} match={this.props.match}/>
                            }
                            <Pagination services={pages} match={ this.props.match } linkPage='/marketplace/datacollection/page/' />
                        </Col>
                    </Row>

                </Container>
            );
    }
}

export default connect(state => state)(SearchDatacollection);


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

