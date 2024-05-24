import React from 'react';
import LandingVideo from '../assets/LandingPage.mp4';
import LandingVideo1 from '../assets/LandingPage2.mp4';
import LandingVideo2 from '../assets/LandingPage3.mp4';
import '../CSS/LandingPage.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BeeAnimation from '../assets/BeeAnimetion.mp4'

const LandingPage = () => {
  return (
    <div className="container landing-page">
      <div className='row'>
        <div className='col-md-6 landing_text'>
          <span>Find your dream product from <span className='landing_text_brand_name'>Shop bee</span></span>
          <button className='button_landing'>Grab The Deal</button>
        </div>
        <div className='col-md-6 d-flex justify-content-center'>
          <Carousel className="custom-carousel">
            <Carousel.Item>
              <video autoPlay muted loop className="d-block w-90 p-2">
                <source src={LandingVideo} type="video/mp4" />
              </video>
            </Carousel.Item>
            <Carousel.Item>
              <video autoPlay muted loop className="d-block w-90 p-2">
                <source src={LandingVideo1} type="video/mp4" />
              </video>
            </Carousel.Item>
            <Carousel.Item>
              <video autoPlay muted loop className="d-block w-90 p-2">
                <source src={LandingVideo2} type="video/mp4" />
              </video>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
