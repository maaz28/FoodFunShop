import React, { Component } from 'react';
// import trending1 from "../img/bg-img/feature-6.jpg";
// import trending2 from "../img/bg-img/feature-7.jpg";
// import trending3 from "../img/bg-img/feature-8.jpg";
// import trending4 from "../img/bg-img/feature-9.jpg";
import icon from '../img/core-img/map.png'
import {
    connect
} from 'react-redux';
import { 
    changeRouteToDetailedHangoutView, UpdateTheStore
} from '../store/actions/action';
import Slide from 'react-reveal/Slide';

class HangoutPlaces extends Component {

    //Code to fetch list from the server goes Here
    componentDidMount() {
        // Call our fetch function below once the component mounts
        if(this.props.hangoutPlaces.length === 0){

            this.callBackendAPI()
            .then(res => {
                console.log(res);
                this.props.UpdateTheStore('HANGOUT_PLACES', res.data.results);
            })
            .catch(err => console.log(err));
        }
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('https://ffs-server-v3.herokuapp.com/places/hangout-places');
        const body = await response.json(); 

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


        //This function dispatch a function written in action.js to save ID of the place to be displayed in detail and to change the route
        changeRouteHandler(id){
            console.log(id);
            this.props.changeRouteToDetailedView(id);
        }
        
    render() {
        return (
<div>
    {
        (!Array.isArray(this.props.hangoutPlaces) || !this.props.hangoutPlaces.length) ? (
null
        ) : (
            <section className="dorne-features-restaurant-area bg-default">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading text-center">
                        <span></span>
                        <h4>Hangout Places</h4>
                    </div>
                </div>
            </div>

            <div className="row">
            {
                 this.props.hangoutPlaces.map(function(item, i){
                    console.log(item, i);
                    return(
                        (item == null) ? (console.log('dafuq')) : (
                            <Slide right key = {i}>
                            <div className="single-features-area col-md-3"  onClick={ () => { this.changeRouteHandler(item._id, item.name) }} style = {{cursor : 'pointer', padding : '0px', marginBottom : '20px'}}>
                            {/* <a href="javascript:void(0)" onClick={ () => { this.changeRouteHandler(item.foodId) }}> */}
                                <img src={item.bannerImage} alt="Restaurant Display" style = {{height : '250px', width : '-webkit-fill-available'}} /> {/*
                                <!-- Rating & Map Area -->*/}
                                {/* <div className="ratings-map-area d-flex">
                                    <a href="javascript:void(0)">{item.rating}</a>
                                    <a href="javascript:void(0)">
                                        <img src={icon} alt="" />
                                    </a>
                                </div> */}
                                <div className="feature-content d-flex align-items-center justify-content-between">
                                    <div className="feature-title">
                                        <h5 style = {{ whiteSpace : 'nowrap', overflow:'hidden'}}>{item.name}</h5>
                                        <p>{item.formatted_address}</p> 
                                    </div>
                                    <div className="feature-favourite">
                                        {/* <a href="javascript:void(0)">
                                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                                        </a> */}
                                    </div>
                                </div>
                            {/* </a> */}
                            </div>
                            <div className="col-md-1">
                            </div>
                        </Slide>
                        )
              
                    )
                }.bind(this))
            }
            </div>
        </div>
    </section>
        )
    }
    
</div>
)
    } 
}
function mapDispatchToProp(dispatch) {
    return ({
        changeRouteToDetailedView : (id) => {
            dispatch(changeRouteToDetailedHangoutView(id))
        },
        UpdateTheStore : (action, list) => {
            dispatch(UpdateTheStore(action, list))
        }
    })
}

function mapStateToProp(state) {
    console.log(state)
    return ({
        hangoutPlaces: state.root.hangoutPlaces
    })
}


export default connect(mapStateToProp, mapDispatchToProp)(HangoutPlaces);