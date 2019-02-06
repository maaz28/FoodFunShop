import React from 'react';
import {
  Router,
  Route
} from 'react-router-dom';
import history from '../history';
import Home from '../components/home';
import Listing from '../components/listing/listing';
import ContactUs from '../components/contact/contactUs';
import AboutUs from '../components/about/aboutUs';
import SingleListing from '../components/singleListing/singleListing';
import AddListing from '../components/addListings/listing' 
import OnBoardSingle from '../components/singleListing/onBoardSingle';
import featuredListing from '../components/listing/featuredListing';
import hangoutSingle from '../components/singleListing/hangoutSingle';
import forgotPassword from '../components/AuthenticationForms/forgot-password';
import resetPassword from '../components/AuthenticationForms/reset-password';
const BasicRouting = (props) => {
  return ( 
    <Router history={history}>
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/listing" component={Listing} />
        <Route path="/contactUs" component={ContactUs} />
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/addlisting" component={AddListing}/>
        <Route path="/singleListing" component={SingleListing}/>
        <Route exact path = '/onBoardSingleListing' component={OnBoardSingle}/>
        <Route exact path="/featuredListing" component={featuredListing}/>
        <Route exact path="/hangoutSingle" component={hangoutSingle}/>
        <Route exact path="/forgot-password" component={forgotPassword}/>
        <Route exact path="/reset-password" component={resetPassword}/>
    </div>
    </Router>
  )
}


export default (BasicRouting);