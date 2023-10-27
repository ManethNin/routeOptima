import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';

import bg1 from '../../assets/bg/1.jpg'; 
import bg2 from '../../assets/bg/2.jpg'; 
import bg3 from '../../assets/bg/3.jpg'; 
import bg4 from '../../assets/bg/4.jpg'; 


export function SliderMain() {
    const navigate=useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 7000,
      };
    
      const images = [bg1,bg2,bg3,bg4];
    
      return (
        <div className="" style={{ overflow: 'hidden', position: 'relative' }}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="slider-item">
                <img
                  style={{ width: '100%', height: '90vh', objectFit: 'cover' }}
                  src={image}
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </Slider>
          {/* Add the custom overlay element */}
          <div className="custom-overlay">
            <div className="overlay-content">
              <h2 className="animated-text typing-animation">Scan Your Briain MRI And Detect Tumors</h2>
              <button onClick={()=>{navigate('/mri-scan')}} className="overlay-button">{"Scan MRI >>"} </button>
            </div>
          </div>
        </div>
      );
      
}



