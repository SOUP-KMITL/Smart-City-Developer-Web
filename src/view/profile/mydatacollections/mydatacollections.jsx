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

import api from '../../../constance/api.js';


class MyDataCollections extends React.Component {

    constructor() {
        super();
        this.state = {
            dataCollections: [],
            loading: false
        }
    }

    componentWillMount() {
        this.requestDataCollection();
    }

    requestDataCollection() {
        const { userName } = this.props.userData;
        this.setState({ loading: true });

        fetch(api.dataCollection + '?owner=' + userName, { method: 'GET' })
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
        console.log(dataCollections);
        return (
            <div>
                <h3 className='content-header'>Data Collections</h3>
                <hr className='content-hr' />
                {
                    loading===true
                        ? <Loading />
                        : dataCollections.length===0
                        ? <Link to='/profile/add-datacollection' className='link'>
                            <Button size='lg' className='btn-smooth btn-raised-success no-data'>+ ADD DATA COLLECTION</Button>
                        </Link>
                        : <MenuDataCollection dataCollections={dataCollections} />
                }
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

const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';

const MenuDataCollection = ({ dataCollections }) => (
    dataCollections!=[] && dataCollections.map((item, i) => {
        return (
            <Container className={getCssType(item.type)} key={i}>
                <Row style={{ width: '880px' }}>
                    <Col md={3} className='mymenu-header'>
                        <img
                            className='img-fluid'
                            src={ item.icon!='' && item.icon!=null && item.icon!='icon'? item.icon: noImageAvialable }
                            alt='test'
                        />
                        <div className='mymenu-header-footer'>
                            <span>{ item.owner }</span>
                        </div>
                    </Col>

                    <Col md={9} className='mymenu-content'>
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

const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)
