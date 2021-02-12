import "./Slideshow.css"
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
];

const Slideshow = () => {
  const fadeProperties = {
    duration: 3500,
    prevArrow: <div></div>,
    nextArrow: <div></div>
  };

  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        {fadeImages.map((each, index) => (
          <div key={index} style={{maxHeight: "600px", width: "100%"}}>
            <img style={{objectFit: "cover", width: "100%"}} src={each} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;