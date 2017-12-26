import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container,
    Col,
    Row
} from 'reactstrap';
import './main.css';
import api from '../../constance/api';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselData: [],
            cityServiceData: [],
            dataBucketData: [],
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const carouselData = await fetch('http://ip.jsontest.com/', { method: 'GET' }).then((res) => res.json());
        const cityServiceData = await fetch(api.cityService, { method: 'GET' }).then((res) => res.json());
        const dataBucketData = await fetch(api.dataBucket, { method: 'GET' }).then((res) => res.json())

        this.setState({
            carouselData: carouselData.data,
            dataBucketData: dataBucketData.data,
            cityServiceData: cityServiceData.data,
        });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex, cityServiceData, dataBucketData, carouselData } = this.state;

        const slides = items.map((item, i) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={i}
                >
                    <img src={item.src} className='d-block mx-auto carousel-img' alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div>
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    cssModule={{ margin: '10px' }}
                    className='carousel'
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} className='carousel-background-left' />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} className='carousel-background-right' />
                </Carousel>

                <Container fluid>
                    <h4 style={{ marginTop: '40px' }}>City Services</h4>
                    <hr style={{ width: '100%'}} />

                    <Row>
                        {cityServiceData.map((item, i) => {
                            return (
                                <Col md={6} xl={3} lg={4} sm={12} key={i}>
                                    <img
                                        src={'https://i0.wp.com/www.applicadthai.com/wp-content/uploads/2016/11/smartcity.jpg'}
                                        className={`img-thumbnail data-img + ${item.type=='a'? 'border-warning': 'border-danger'}`}
                                        alt={item.serviceName}
                                    />
                                    <p>{item.serviceName}</p>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>

                <Container fluid>
                    <h4 style={{ marginTop: '40px' }}>Data Buckets</h4>
                    <hr style={{ width: '100%'}} />

                    <Row>
                        {dataBucketData.map((item, i) => {
                            let borderColor = '';
                            if (item.type == 'a') borderColor = 'border-warning';
                            if (item.type == 'b') borderColor = 'border-danger';
                            if (item.type == 'c') borderColor = 'border-info';
                            return (
                                <Col md={6} xl={3} lg={4} sm={12} key={i}>
                                    <img
                                        src={'https://i0.wp.com/www.applicadthai.com/wp-content/uploads/2016/11/smartcity.jpg'}
                                        className={`img-thumbnail data-img ${borderColor}`}
                                        alt={item.collectionName}
                                    />
                                    <p>{item.collectionName}</p>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

const items = [
    {
        src: 'https://www.applicadthai.com/wp-content/uploads/2016/11/12144667_1059438674100775_4006019126604714959_n.png',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://www.applicadthai.com/wp-content/uploads/2016/11/12144667_1059438674100775_4006019126604714959_n.png',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://www.applicadthai.com/wp-content/uploads/2016/11/12144667_1059438674100775_4006019126604714959_n.png',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

export default Main;
