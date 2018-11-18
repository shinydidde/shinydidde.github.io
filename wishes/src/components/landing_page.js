import React from 'react';
import { Slide } from 'react-slideshow-image';

const slideImages = [
    '../assets/images/landing/splash.png',
    '../assets/images/about/creative.png',
    '../assets/images/work/create_react_portfolio.png'
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: false
  }

export default props =>{
    return(
        <div className='landing-img'id="landing">
        <Slide {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
        </div>
    );
}