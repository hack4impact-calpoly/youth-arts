import "./Slideshow.css";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const fadeImages = [
    "https://pryac.s3.us-west-1.amazonaws.com/performanceHeader.JPG",
    "https://pryac.s3.us-west-1.amazonaws.com/volunteerHeader.jpg",
];

const Slideshow = () => {
    const fadeProperties = {
        duration: 3500,
        prevArrow: <div></div>,
        nextArrow: <div></div>,
    };

    return (
        <div className="slide-container">
            <Fade {...fadeProperties}>
                {fadeImages.map((each, index) => (
                    <div
                        key={index}
                        style={{ maxHeight: "600px", width: "100%" }}
                    >
                        <img
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "650px",
                            }}
                            src={each}
                        />
                    </div>
                ))}
            </Fade>
        </div>
    );
};

export default Slideshow;
