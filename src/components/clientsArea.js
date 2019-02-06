import React, { Component } from 'react';
// react-slick carousel used here
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ClientsArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      imagesObj : []
    }
  }

      componentDidMount() {
        function importAll(r) {
          let images = {};
          r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
          return images;
        }
        const images = importAll(require.context('../img/logos', false, /\.(png|jpe?g|svg)$/));        
        console.log(images)
        this.setState({
          imagesObj : images
        })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay : true,
            autoplaySpeed: 1800,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed : 1500,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
          };

        return (
          <div className="dorne-clients-area section-padding-100" style = {{paddingRight : '50px', paddingLeft : '50px'}}>
          {<Slider {...settings}>
              {
                Object.keys(this.state.imagesObj).map((item, i) => {
                  var titleToBeDisplayedOnHover;
                  if(item.indexOf('.png') !== -1){
                    titleToBeDisplayedOnHover = item.slice(0, item.indexOf('.png'))
                  }
                  else if(item.indexOf('.jpg') !== -1){
                    titleToBeDisplayedOnHover = item.slice(0, item.indexOf('.jpg'))
                  }
                  console.log(item, i);
                  return(
                <div key = {i}  >
                  <img src={this.state.imagesObj[item]} alt = 'Client Pictures' title = {titleToBeDisplayedOnHover} style = {{height : '120px'}}/>
                </div>
                  )
              })
              }
          </Slider>}
            </div>
        )
    } 
}



export default (ClientsArea);
