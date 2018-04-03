import React from 'react';
import { connect } from 'react-redux';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './main.css';



class MainCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselData: [],
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
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
        const { activeIndex } = this.state;

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
                    cssModule={{ margin: '10px', zIndex: -1 }}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} className='carousel-background-left' />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} className='carousel-background-right' />
                </Carousel>
                <div className=' overlay'>
                    <h2>Smart City</h2>
                    <h5>Open data exchange platform for supporting smart city service  <br />development and innovation.</h5>
                    <a href='https://soup-kmitl.gitbooks.io/smart-city/content/' target='_blank'>
                        <Button color='success' className='btn-white' outline size='lg'>Get started</Button>
                    </a>
                </div>


                {
                    /*
                     *<div className='carousel-footer'>
                     *    <h4>Join us and share your idea</h4>
                     *    <Button color='success' className='btn-white' size='md' outline>Sign Up</Button>
                     *</div>
                     */
                }
            </div>
        );
    }
}


export default connect(state => state)(MainCarousel);

const items = [
    {
        src: 'https://static.pexels.com/photos/356830/pexels-photo-356830.jpeg',
        altText: 'Slide 1',
    },
    {
        src: 'https://static.pexels.com/photos/358488/pexels-photo-358488.jpeg',
        altText: 'Slide 2',
    },
    {
        src: 'https://static.pexels.com/photos/546819/pexels-photo-546819.jpeg',
        altText: 'Slide 3',
    }
];
