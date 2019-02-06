import React, { Component } from "react";
import Slider from "react-slick";
import YoutubeVideo from './youtubeVideo'

export default class SimpleSlider extends Component {

  getId(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
 
  render() {  
    const settings = {
      accessibility : true,
      infinite: true, 
      dots: true,
      centerPadding: "60px",
      slidesToShow: 1,
      slideToScroll : 1,
      speed: 9000,
      autoplay : true,
      pauseOnDotsHover : true,
      pauseOnFocus : true,
      autoplaySpeed : 1000
    };
    return (
      <div>
        <Slider {...settings}>
        {this.props.photos.map((item, i) => {
          return(
          <div key = {i}>
            <img src = {item} style = {{ height : '350px', margin : 'auto' }}/>
          </div>
          )
        })}
        {this.props.videos.map((item, i) => {
          let id = this.getId(item)
          console.log(item)
          return(
          <div key = {i}>
              <YoutubeVideo id = {id}/>
          </div>
          )
        })}
        </Slider>
        </div>
    );
  }
}