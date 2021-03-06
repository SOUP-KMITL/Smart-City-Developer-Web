import React from 'react';
import {
    Button,
    Container,
    Row,
    Col,
} from 'reactstrap';
import './resouces.css';

export default class Resources extends React.Component {

    render() {
        return (
            <Container>
                <Row style={{ marginBottom: '40px', paddingTop: '40px' }}>
                    <Col md={2}></Col>

                    <Col md={8} xs={12} className=''>
                        <h3 className='content-header'>Resources</h3>
                        <hr className='content-hr' />

                        <div class="resources">
                            <ul>
                                <li>
                                    <a href='https://drive.google.com/file/d/1l0MnyHMAqBmSUaYXPLd9R9lunPatC_gM/view?usp=sharing' target='_blank'>
                                        <strong>* Augmented Reality & Virtual Reality (pptx)</strong><span className='black'> รายละเอียดการพัฒนา AR และ VR</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://docs.google.com/presentation/d/15jB4TTmPON8O3p65s8MgSWq0gvYJiby8T60URXnLv3U/edit?usp=sharing' target='_blank'>
                                        <strong>* Storage Layer for Smart City Cloud Platform (GSlide)</strong><span className='black'> รายละเอียดทางเทคนิคของระบบเก็บข้อมูลที่ใช้ในแพลตฟอร์ม</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://drive.google.com/file/d/1ayezfXKCNKQUtT_LLAhISRdp2FdrdFxn/view?usp=sharing' target='_blank'>
                                        <strong>* Introduction of Integrated Smart City Cloud Platform (pdf)</strong><span className='black'> ข้อมูลเบื้องต้นของแพลตฟอร์ม</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://docs.google.com/document/d/1T46xid3iNmINzKMJxnpqoOLMWun-owkdhuOUvl98k3E/edit?usp=sharing' target='_blank'>
                                        <strong>* Progress Report on Storage Layer Development (GDoc)</strong><span className='black'> รายงานความคืบหน้าการพัฒนาระบบเก็บข้อมูล</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>

                </Row>
            </Container>
        );
    }
}
