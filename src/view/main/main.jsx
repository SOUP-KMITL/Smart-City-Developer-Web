import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Container,
    Col,
    Row,
    Button,
    ButtonGroup,
} from 'reactstrap';
import './main.css';
import api from '../../constance/api';
import Content from './content';

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
        const carouselData = await fetch(api.cityService, { method: 'GET' }).then((res) => res.json());
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
                    <div className='item' style={{ backgroundImage: `url(${item.src})`, backgroundSize: 'cover' }}></div>
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
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} className='carousel-background-left' />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} className='carousel-background-right' />
                </Carousel>


                <div className='carousel-footer'>
                    <h4>Join us and share your idea</h4>
                    <ButtonGroup>
                        <Button color='warning' className='btn-white' size='lg' outline>Sign In</Button>
                        <Button color='success' className='btn-white' size='lg' outline>Sign Up</Button>
                    </ButtonGroup>
                </div>

                <div className='content'>
                    <Content />
                </div>

            </div>
        );
    }
}

const items = [
    {
        src: 'http://sustainder.com/_imager/uploads/1646/Infographic-Smart-Outdoor_fight_EN_7aad86e649bd05ec9da5de6611605f7a.png',
        altText: 'Slide 1',
    },
    {
        src: 'https://www.matichonweekly.com/wp-content/uploads/2017/06/05-SE-Smart-City.jpg',
        altText: 'Slide 2',
    },
    {
        src: 'http://www.bosch-presse.de/pressportal/de/media/dam_images/pi9519/20161216_en_infografik_vorab_1024x512_de_engl_03_bosch_vorabkom_e_sprachassistent.jpg',
        altText: 'Slide 3',
    }
];

export default Main;
