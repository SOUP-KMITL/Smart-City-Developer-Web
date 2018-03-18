import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import ReactJson from 'react-json-view';
import axios from 'axios';
import Blockies from 'react-blockies';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainRightPanel from '../share/component/right-panel.jsx';
import './cityservice-view.css';
import api from '../../constance/api.js';
import Loading from '../share/component/loading.jsx';


class ViewDatacollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {},
            loading: true,
            thumbnail: null
        }
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.requestDataCollection(this.props.match.params);
    }

    requestUserThumbnail(serviceOwner) {
        axios.get(api.users + serviceOwner + '/thumbnail')
            .then(({ status }) => {
                setTimeout(() => {
                    this.setState({ thumbnail: status });
                }, 1000);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    requestDataCollection({ collectionName }) {
        axios.get(api.dataCollection + '?collectionName=' + collectionName)
        .then(({ data }) => {
                if (data.sampleData!=undefined)
                    data.sampleData = data.sampleData;
                this.setState({ dataCollection: data.content[0] });
                if (data.swagger!=undefined)
                    this.getSwagger();
                if (data.thumbnail != undefined)
                    setTimeout(() => {
                        this.setState({ loading: false });
                    }, 1000);
                else
                    this.requestUserThumbnail();
            })
            .catch(({ response }) => {
                console.log('CANNOT GET DATA COLLECTION');
            })
    }

    formatDate(date) {
        if (date != null) {
            const value = new Date(date);
            return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
        }
        else
            return '-';
    }

    render() {
        const { dataCollection, loading, thumbnail } = this.state;

        if (loading === true)
            return ( <Loading /> )
        else
            return (
                <Container className='fullscreen' style={{ paddingTop: 50 }}>
                    <Row>

                        <Col md={3} xs={12} sm={12}>
                            {
                                this.props.userData.userId==undefined
                                ? <Link to='/signin' className='link'>
                                    <Button size='lg' block className='btn-smooth btn-raised-success'>Sign In</Button>
                                </Link>
                                :<ProfileMenu userData={ this.props.userData }/>
                            }
                        </Col>

                        <Col md={1} xs={12} sm={12}>
                            <hr className='vertical' />
                        </Col>

                        <Col md={{ size: 7 }} sm={12} style={{ marginBottom: '30px' }}>

                            <div className='img-product'>
                                {
                                    dataCollection.thumbnail
                                        && <img
                                            src={dataCollection.thumbnail}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={dataCollection.collectionName}
                                        />
                                }
                                {
                                    !dataCollection.thumbnail && thumbnail!=200
                                        && <Blockies
                                            seed={dataCollection.owner}
                                            size={7}
                                            scale={30}
                                            color='#DC90DD'
                                            bgColor='#F0F0F0'
                                            spotColor='#77C5D4'
                                        />
                                }
                                {
                                    !dataCollection.thumbnail && thumbnail==200
                                        && <img
                                            src={api.users + dataCollection.owner + '/thumbnail'}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={dataCollection.collectionName}
                                        />
                                }
                            </div>
                            <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{ dataCollection.collectionName }</h3>
                            </div>
                            <div className='product-header-description'>
                                <p><FaUser color='#56b8db' /> { dataCollection.owner }</p>
                                <p><FaCalendarO color='#56b8db' />  { this.formatDate(dataCollection.createdAt) }</p>
                            </div>
                            <hr />

                            <p>{ dataCollection.description }</p>
                            <hr />

                            {
                                dataCollection.sampleData!=undefined
                                    && <div>
                                        <h3>Sample API</h3>
                                        <br />
                                        <ReactJson src={dataCollection.sampleData} />
                                        <hr />
                                    </div>
                            }

                            {
                                dataCollection.appLink
                                    && <div>
                                        <h3>Application Link</h3>
                                        <a href={dataCollection.appLink} >{dataCollection.appLink}</a>
                                        <hr />
                                    </div>
                            }

                            {
                                dataCollection.swagger!=undefined
                                    && <div id="swaggerContainer" className='swagger' />
                            }

                        </Col>
                    </Row>
                </Container>
            );
    }
}

export default connect(state => state)(ViewDatacollection);
