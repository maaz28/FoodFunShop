import React from 'react';
import YouTube from 'react-youtube';
 
export default class YoutubeVideo extends React.Component {

  componentWillReceiveProps(nextProp){
    console.log(nextProp);
  }
  render() {
    const opts = {
      height: '350',
      width: '100%',
      margin : 'auto',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls : 0
      }
    };
 
    return (
      <YouTube
        videoId={this.props.id}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}