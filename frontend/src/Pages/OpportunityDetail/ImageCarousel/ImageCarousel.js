import React, {useState} from 'react'
import { CarouselData } from './CarouselData'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import '../OpportunityDetail.css'


const ImageCarousel = (props) => {
    const slides = props.slides;
    console.log(slides);
    let CarouselDisplay = [];
    let notDefault = false;
    if (slides && slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            notDefault = true;
            CarouselDisplay.push( { image: slides[i] } );
        }
    }
    else
    {
        notDefault = false;
        CarouselDisplay = CarouselData;
    }

    const[current, setCurrent] = useState(0)
    const length = CarouselDisplay.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return(
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
            {notDefault ? CarouselDisplay.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'}
                    key={index}>
                        {index === current && (
                             <img src={slide.image} width= "auto" height="400" className="img"/>
                        )}
                    </div>
                )
             }) : 
             CarouselDisplay.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'}
                    key={index}>
                        {index === current && (
                             <img src={slide.image} width= "auto" height="200" className="img"/>
                        )}
                    </div>
                )
             })}
        </section>
    );
};

export default ImageCarousel