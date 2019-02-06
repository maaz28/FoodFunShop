import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import ListingContent from './listingContent'

class AddListing extends Component {

    render() {
        return (
            <div>
                <CustomNavbar/>
                <ListingContent/>
                <Footer/>
            </div>
        )
    } 
}


export default (AddListing);
