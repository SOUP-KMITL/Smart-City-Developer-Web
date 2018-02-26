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

const PAGESIZE = 5;


class MyDataCollections extends React.Component {

    constructor(props) {
        super();
        this.state = {
            dataCollections: [],
            loading: false,
        }
        this.requestDataCollection(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData != undefined)
            this.requestDataCollection(props);
    }

    requestDataCollection({userData, match}) {
        const page = +match.params.page - 1;
        this.setState({ loading: true });

        fetch(api.dataCollection + `?owner=${userData.userName}&size=${PAGESIZE}&page=${page}`, { method: 'GET' })
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
            .finally(() => {
                this.setState({ loading: false });
            });
    }


    render() {
        const { dataCollections, loading } = this.state;

        return (
            <div>
                <h3 className='content-header'>Data Collections</h3>
                {
                    dataCollections.length!==0 &&
                        <Link to='/profile/add-datacollection' className='link'>
                            <Button size='sm' className='btn-smooth btn-raised-success content-header-btn no-data'><FaPlus style={{marginTop: '3px'}} />  DataCollection</Button>
                        </Link>
                }
                <hr className='content-hr' />
                {
                    loading===true
                        ? <Loading />
                        : dataCollections.length===0
                        ? <Link to='/profile/add-datacollection' className='link'>
                            <Button size='lg' className='btn-smooth btn-raised-success no-data'><FaPlus style={{marginTop: '5px'}} />  Data Collection</Button>
                        </Link>
                        : <MenuDataCollection dataCollections={dataCollections.content} match={this.props.match}/>
                }

                <Pagination services={dataCollections} match={ this.props.match } linkPage='/profile/my-datacollections/page/' />
            </div>
        );
    }
}


export default connect(state => state)(MyDataCollections);



const getCssType = (value, index) => {
    return classnames( 'mymenu', {
        'border-hr-type-a': value==='a',
        'border-hr-type-b': value==='b',
        'border-hr-type-c': value==='c',
    });
}

const MenuDataCollection = ({ dataCollections, match }) => (
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

const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)
