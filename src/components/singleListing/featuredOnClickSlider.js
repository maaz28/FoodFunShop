import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

 
export default class LightboxExample extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      images : this.props.photos,
      photoIndex: 0,
      isOpen: false,
    };
  }
 
  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        {(this.props.menu) ? (
        <button type="button" className= 'btn btn-danger' onClick={() => this.setState({ isOpen: true })}>
       { this.props.buttonName ||  "Show Menu" } 
        </button>
        ) :
        (
          <div className = 'row'>
        {this.props.photos.map( (item, i) => {
         return (
          <div className="col-md-4">
          <img src = {item} onClick={() => this.setState({ isOpen: true, photoIndex : i })} style = {{width: '300px', height: '160px'}}/>
          </div>
         ) 
        })
        }
      </div> 
        )}
 
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