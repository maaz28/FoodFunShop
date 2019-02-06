
import React, { Component } from 'react';

class SendMessageButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileScreen : false
        }
    }

    componentDidMount(){
        var useragent = navigator.userAgent;
        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            this.setState({mobileScreen : true})
        }
    }
        

    render() {
        return (
            <div>
                {
                    (this.state.mobileScreen && this.props.whatsappNumber) ? (
<a type="button" href = {"https://wa.me/" + this.props.whatsappNumber} style = {{backgroundColor : '#25D366'}} class="btn btn-secondary btn-lg btn-block">SEND WHATSAPP</a>
                    ) : (<a href="https://wa.me/923311384734" className="btn btn-outline-danger btn-contact">SEND A MESSAGE</a>)
                }
            </div>
        )
    } 
}


export default (SendMessageButton);
