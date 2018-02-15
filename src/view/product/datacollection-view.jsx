import React from 'react';
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

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainRightPanel from '../share/component/right-panel.jsx';
import MainSearchBar from '../share/component/search.jsx';
import './cityservice-view.css';
import api from '../../constance/api.js';


export default class ViewDatacollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {},
        }
    }

    componentDidMount() {
        this.requestDataCollection(this.props.match.params);
    }

    requestDataCollection({ collectionName }) {
        fetch(api.dataCollection + '?collectionName=' + collectionName, {
            method: 'GET',
        }).then(response => response.json()).then(
            res => {
                if (res.sampleData!=undefined)
                    res.sampleData = res.sampleData;
                this.setState({ dataCollection: res[0] });
                if (res.swagger!=undefined)
                    this.getSwagger();
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }


    render() {
        const { dataCollection } = this.state;

        return (
            <Container className='fullscreen' style={{ paddingTop: 50 }}>
                <Row>

                    <Col md={3} xs={12} sm={12}>
                        {
                            this.props.userData
                            ?<ProfileMenu userData={ this.props.userData }/>
                            : <Link to='/signin' className='link'>
                                <Button size='lg' block className='btn-smooth btn-raised-success'>Sign In</Button>
                            </Link>
                        }
                    </Col>

                    <Col md={1} xs={12} sm={12}>
                        <hr className='vertical' />
                    </Col>

                    <Col md={{ size: 7 }} sm={12} style={{ marginBottom: '30px' }}>

                        <div className='img-product'>
                            {
                                dataCollection.icon!==null &&
                                    <img
                                        src={ dataCollection.icon }
                                        className='img-fluid'
                                        alt={ dataCollection.collectionName }
                                    />
                            }
                        </div>
                        <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>{ dataCollection.collectionName }</h3>
                        </div>
                        <div className='product-header-description'>
                            <p><FaUser color='#56b8db' /> { dataCollection.owner }</p>
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
