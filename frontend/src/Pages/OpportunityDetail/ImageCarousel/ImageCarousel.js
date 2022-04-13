import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../OpportunityDetail.css";
import logo from "../../../Images/YouthArtsLogoMark.png";

const ImageCarousel = (props) => {
    const slides = props.slides;
    let CarouselDisplay = [];
    let notDefault = false;
    if (slides && slides.length > 0) {
        let count = 0;
        for (let i = 0; i < slides.length; i++) {
            notDefault = true;
            console.log(slides[i]);
            if (slides[i] !== "" && !slides[i].includes("undefined")) {
                CarouselDisplay.push({ image: slides[i] });
            } else {
                count++;
            }
        }
        if (count === slides.length - 1) {
            notDefault = false;
            CarouselDisplay = [
                {
                    image: logo,
                },
            ];
        }
    } else {
        notDefault = false;
        CarouselDisplay = [
            {
                image: logo,
            },
        ];
    }

    useEffect(() => {
        if (slides && slides.length > 0) {
            for (let i = 0; i < slides.length; i++) {
                notDefault = true;
                if (slides[i] !== "") {
                    CarouselDisplay.push({ image: slides[i] });
                }
            }
        } else {
            notDefault = false;
            CarouselDisplay = [
                {
                    image: logo,
                },
            ];
        }
    }, [slides]);

    const [current, setCurrent] = useState(0);
    const length = CarouselDisplay.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextSlide}
            />
            {CarouselDisplay.map((slide, index) => {
                return (
                    <div
                        className={index === current ? "slide active" : "slide"}
                        key={index}
                    >
                        {index === current && (
                            <img
                                src={slide.image}
                                width="auto"
                                height="400"
                                className="img"
                            />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageCarousel;
