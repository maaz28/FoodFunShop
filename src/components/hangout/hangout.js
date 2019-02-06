import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import HangoutDetails from './hangoutDetails'

class Hangout extends Component {

    render() {
        return (
            <div>
               <CustomNavbar/>
                <HangoutDetails/>
               <Footer/>
            </div>
        )
    } 
}

 
export default (Hangout);

