import React, { useEffect } from "react";
import LandingVideo from "../assets/LandingPage.mp4";
import LandingVideo1 from "../assets/LandingPage2.mp4";
import LandingVideo2 from "../assets/LandingPage3.mp4";
import "../CSS/LandingPage.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {

  useEffect(() => {
    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
    .typewrite > .wrap {
        border-right: 0.08em solid #fff;
        }
        @media (max-width: 768px) {
            .typewrite > .wrap {
                font-size: 20px; 
                border-right: 0.05em solid #fff; 
            }
        }
        @media (max-width: 480px) {
            .typewrite > .wrap {
                font-size: 32px;             
                border-right: 0.03em solid #fff; 
            }
        }
        @media (min-width: 769px) {
            .typewrite > .wrap {
                font-size: 30px; 
                border-right: 0.1em solid #fff; 
            }
        }
    `;
    document.body.appendChild(css);
  }, []);

  return (
    <div className="container landing-page">
      <div className="row">
        <div className="col-md-6 landing_text">
          <h1>
            <span
              className="typewrite"
              data-period="2000"
              data-type='[ "Discover Amazing Deals.", "Shop the Latest Trends.", "Find Everything You Need."]'
            >
              <span className="wrap"></span>
            </span>
          </h1>
          <span className="landing_text_brand_name">Shop Bee</span>
          <button className="button_landing">Grab The Deal</button>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
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
};

export default LandingPage;
