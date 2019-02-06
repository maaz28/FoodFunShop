import React, { Component } from 'react';
// react-slick carousel used here
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class BannerSlider extends Component {
    render() {
        var settings = {
            arrows : true,
            dots: false,
            accessibility : true,
            infinite: true,
            draggable : true,
            focusOnSelect : true,
            autoplay : true,
            autoplaySpeed: 4000,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed : 1200,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
          };

        return (
          <div className="dorne-clients-area section-padding-100" style = {{paddingTop : '20px'}}>
          {<Slider {...settings}>
              {
                (this.props.bannerImages).map((item, i) => {
                  return(
                <div key = {i} >
                  <img src={item} style = {{width : '100%', height : '350px'}}  />
                </div>
                  )
              })
              }
          </Slider>}
            </div>
        )
    } 
}



export default (BannerSlider);
