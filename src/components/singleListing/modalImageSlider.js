import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

 
export default class OnClickSlider extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      images : [],
      photoIndex: 0,
      isOpen: false,
    };
  }
 
  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        <div className = 'row'>
        {this.props.photos.map( (item, i) => {
          let tempArr = this.state.images;
          let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference='+item.photo_reference+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE';
         tempArr.push(url);
         return (
          <div className="col-md-4">
          <img src = {url} onClick={() => this.setState({ isOpen: true, photoIndex : i, images : tempArr })} style = {{width: '300px', height: '160px'}}/>
          </div>
         ) 
        })
        }
      </div>
 
        {isOpen && (
          <Lightbox
            mainSrc={this.state.images[photoIndex]}
            nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
            prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}