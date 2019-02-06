import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import ContactContainer from './ContactContainer'
import '../../css/contactStyling/style.css'
// import '../../css/contactStyling/bootstrap.css'

class ContactUs extends Component {

    render() {
        return (
            <div>
                <CustomNavbar/>
                <ContactContainer/>  
                <Footer/>
            </div>
        )
    } 
}


export default (ContactUs);
