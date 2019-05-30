import React, { Component } from 'react';
import CustomNavbar from './navbar';
import Footer from './footer';
import ClientsArea from './clientsArea'
// import TrendingPlaces from './trendingPlaces'
import AboutArea from './aboutArea'
import FeaturedPlaces from './featuredPlaces'
import WelcomeArea from './welcomeArea';
import CategoryArea from './categoryArea';
import '../css/bootstrap/bootstrap.min.css';
import HangoutPlaces from './hangoutPlaces';
 import '../css/style.css';
// google font ka link import krna hai


class Home extends Component {


    render() {
        return (
            <div>
    <CustomNavbar />
    <WelcomeArea/>
    <CategoryArea/>
    <AboutArea/>
    <FeaturedPlaces/>
    <HangoutPlaces/>
    <ClientsArea/>
    <Footer/>
            </div>
        )
    }
}

export default (Home);
