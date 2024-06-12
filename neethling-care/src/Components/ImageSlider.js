import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../Styles/Slider.css"; // Add your custom CSS for the slider
import Silder_1 from "../Assets/Slider_2.png"
import Silder_2 from "../Assets/slider_1.png"
import Silder_3 from "../Assets/slider_3.jpg"

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Adjust the interval in milliseconds
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src={Silder_1} alt="Pic 1" />
                </div>
                <div>
                    <img src={Silder_2} alt="Pic 2" />
                </div>
                <div>
                    <img src={Silder_3} alt="Pic 3" />
                </div>
                {/* Add more images here */}
            </Slider>
        </div>
    );
};

export default ImageSlider;
