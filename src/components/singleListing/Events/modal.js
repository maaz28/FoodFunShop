import React, { Component } from 'react';
import Popup from "reactjs-popup";
import SimpleSlider from './modalSlider'
import EventDescription from './eventDescription';
 
class CustomizeModal extends Component{
    state = {
        open: false,
    }

    componentWillReceiveProps(prop){
      console.log(prop)
      this.setState({
        open : prop
      })
    }

    closeModal = () => {
      this.setState({ open: false });
    };

    render(){
    return (
    <Popup
    scroll = 'paper'
    contentStyle = {{width : '60%', padding : '15px', height : 'auto'}}
    open={this.state.open}
    closeOnDocumentClick
    onClose={this.closeModal}
    // position="bottom center" 
    modal = {true}>
    <div>
      <SimpleSlider/>
      <EventDescription/>
    </div>
  </Popup>
);
}
}
export default CustomizeModal;