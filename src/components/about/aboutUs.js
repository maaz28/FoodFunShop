import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import AboutDetails from './aboutDetails';

class AboutUs extends Component{
    render(){
return ( 
    <div>
    <CustomNavbar/>
    <AboutDetails/>
    <Footer/>
    </div>
    
  )
}
}


export default (AboutUs);