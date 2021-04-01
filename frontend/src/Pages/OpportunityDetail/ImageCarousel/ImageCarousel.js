import React, {useState} from 'react'
import { CarouselData } from './CarouselData'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import '../OpportunityDetail.css'


const ImageCarousel = ({slides}) => {

const[current, setCurrent] = useState(0)
const length = slides.length

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
            {CarouselData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'}
                    key={index}>
                        {index === current && (
                             <img src={slide.image} width= "auto" height="400" className="img"/>
                        )}
                    </div>
                )
            })}
        </section>
    );
};

export default ImageCarousel