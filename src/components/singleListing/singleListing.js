import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import Single from './single';
import { connect } from 'react-redux';

class SingleListing extends Component {


   
      
    render() {
        return (
            <div>
                <CustomNavbar/>
                <Single/>
                <Footer/>
            </div>
        )
    } 
}

export default connect(null, null)(SingleListing);
