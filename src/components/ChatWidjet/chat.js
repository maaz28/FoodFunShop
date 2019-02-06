import React, { Component } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { connect } from 'react-redux';
import post_request from '../../HelperFunctions/postRequest'
// import firebase from 'firebase/app';
// var firstTime = true;
class Chat extends Component {
    componentDidMount() {
        addResponseMessage("You can order from here, just type the name and the menu number from the menu list !");
      }


    removeRestaurantName(str){
        let splitStr = str.split('/');
        return splitStr[0];
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        console.log(this.props.formatted_phone_number)
        // Now send the message throught the backend API
        post_request('https://ffs-server-v3.herokuapp.com/portal/sms',{message : newMessage, phone : this.props.formatted_phone_number}).then((res) => {
            console.log('success', res)
        })
        addResponseMessage("Thanks For Ordering, We'll get back to you shortly !");
      }

    render() {
        return (
            <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title = {"Welcome " + this.props.name }
            subtitle = "Order Anything from Here !"
          />
        )
    } 
}

function mapStateToProp(state) {
    return ({
        name : state.user.name,
        formatted_phone_number : state.root.formatted_phone_number
    })
}


export default connect(mapStateToProp, null)(Chat);
