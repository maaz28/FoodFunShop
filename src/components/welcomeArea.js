import React, { Component } from 'react';
// import backgroundImg from '../img/bg-img/hero-1.jpg';
import backgroundImg from '../img/bg-img/1.jpg';
import SuggestPlaces from './locationSearch/geoSuggest'
import locationIcon from '../img/location3.png';
import Grid from '@material-ui/core/Grid';

import {
    connect
} from 'react-redux';
import {
    routeStringForListingComponent
} from '../store/actions/action';
class WelcomeArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'food',
            area : '',
            locationAddress : ''
        }
    }
    
    // *********************** HANDLERS *********************** //
    categoryHandler(ev) {
        this.setState({
            category: ev.target.value
        })
    }

    areaHandler = (val) => {
        console.log(val)
        let str =  val.lat+"/"+val.lng

        this.setState({
            area : str
        })
    }

    searchBtnHandler(ev){
        ev.preventDefault();
        if(this.state.area){
            this.props.routeStringForListingComponent('https://ffs-server-v3.herokuapp.com/places/'+this.state.category+'/'+this.state.area);
        }
    }

    locationBtnHandler = () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0 
          };
        navigator.geolocation.getCurrentPosition((pos) => {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            console.log(pos)

            this.callBackendAPI('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE')
            .then(res => {
                console.log(res)
                console.log(res.results[0].formatted_address)
                this.setState({
                    area : lat+'/'+lng,
                    locationAddress : res.results[0].formatted_address
                })
            })
            .catch(err => console.log(err));

        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          , options);
    }
        // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
        callBackendAPI = async (url) => {
            const response = await fetch(url);
            const body = await response.json();
            if (response.status !== 200) {
                throw Error(body.message)
            }
            return body;
        };

    render() {
        return (
        <div>
            <section className="dorne-welcome-area bg-img bg-overlay" style={{backgroundImage: 'url('+backgroundImg+ ')'}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-12 col-md-10">
                            <div className="hero-content">
                                {/*
                                <Bounce left cascade> */}
                                    <h2>Discover places near you</h2>
                                    <h4>This is the best guide of your city</h4>
                                    {/* </Bounce> */}
                            </div>
                            {/*
                            <!-- Hero Search Form -->*/}
                            <div className="hero-search-form">
                                {/*
                                <!-- Tabs -->*/}
                                <div className="nav nav-tabs" id="heroTab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-places-tab" data-toggle="tab" href="#nav-places" role="tab" aria-controls="nav-places"
                                        aria-selected="true">Places</a>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-places" role="tabpanel" aria-labelledby="nav-places-tab" style = {{height : '250px'}}>
                                        <h6>What are you looking for?</h6>
                                        <form onSubmit={this.searchBtnHandler.bind(this)}>
                                            <select className="custom-select" value={this.state.category} onChange = {this.categoryHandler.bind(this)}>
                                                <option value="food">Food</option>
                                                <option value="fun">Fun</option>
                                                <option value="shop">Shop</option>
                                            </select>
                                            <Grid container spacing={0} style = {{marginRight : '10px'}}>
                                            <Grid item xs>
                                                <SuggestPlaces areaHandler = {this.areaHandler} locationAddress = {this.state.locationAddress}/>
                                            </Grid>                                            
                                            <Grid item>
                                                <img src={locationIcon} title = "Current Location" style ={{cursor : 'pointer', height : '100%'}} onClick = {this.locationBtnHandler}/>
                                            </Grid>
                                            </Grid>
                                                {/* </div> */}
                                            <button type="submit" className="btn dorne-btn" style = {{cursor : 'pointer'}}>
                                                <i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-social-btn">
                    <div className="social-title d-flex align-items-center">
                        <h6>Follow us on Social Media</h6>
                        <span></span>
                    </div>
                    <div className="social-btns">
                        <a href="javascript:void(0)">
                            <i className="fa fa-instagram" aria-haspopup="true"></i>
                        </a>
                        <a href="https://twitter.com/foodfunshop?lang=en">
                            <i className="fa fa-twitter" aria-haspopup="true"></i>
                        </a>
                        <a href="https://www.facebook.com/FoodFunShop/">
                            <i className="fa fa-facebook" aria-haspopup="true"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
        )
    } 
}

function mapDispatchToProp(dispatch) {
    return ({
        routeStringForListingComponent : (routeName) => {
            dispatch(routeStringForListingComponent(routeName))
        }
    })
}


export default connect(null, mapDispatchToProp) (WelcomeArea);