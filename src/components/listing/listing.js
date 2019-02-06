import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import SearchedList from './searchedList'
import '../../css/bootstrap/bootstrap.min.css';
 import '../../css/style.css';
// import '../../css/set1.css'
// import '../../css/themify-icons.css'
//import '../../css/simple-line-icons.css'

class Listing extends Component {

    render() {
        return (
            <div>
               <CustomNavbar/>
                <SearchedList/>
               <Footer/>
            </div>
        )
    } 
}

 
export default (Listing);

