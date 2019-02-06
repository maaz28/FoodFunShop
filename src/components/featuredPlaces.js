import React, { Component } from 'react';
import backgroundImg2 from '../img/bg-img/hero-2.jpg';
import Fade from 'react-reveal/Fade';
        import {
            connect
        } from 'react-redux';
        import {
            changeRouteToOnBoardDetailedView, routeStringForListingComponent, UpdateTheStore
        } from '../store/actions/action';
import history from '../history'

class FeaturedPlaces extends Component {

    //Code to fetch list from the server goes Here
    componentDidMount() {
        // Call our fetch function below once the component mounts
        if(this.props.featuredPlaces.length === 0){
  this.callBackendAPI()
            .then(res => {
                this.props.UpdateTheStore('FEATURED_PLACES', res.data.results);
            })
            .catch(err => console.log(err));
        }
    } 
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('https://ffs-server-v3.herokuapp.com/places/featured-places');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    //This function dispatch a function written in action.js to save ID of the place to be displayed in detail and to change the route
    changeRouteHandler(foodId){
        console.log(foodId);
        this.props.changeRouteToOnBoardDetailedView(foodId);
    }

    // This Handler collects route info form this comoponent and updates the score
    viewAllBtnHandler(){
        console.log('working');
        history.push('/featuredListing')
    }
    render() {
        return (
            <section className="main-block dorne-editors-pick-area bg-img bg-overlay-9 section-padding-100" style={{backgroundImage:
                'url('+backgroundImg2+ ')'}}>

                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-heading text-center">
                                        <span></span>
                                        <h4>Featured Places</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                   { 
                       (this.props.featuredPlaces.length>0) ? (
                        this.props.featuredPlaces.map(function(item, i){
                            console.log(item, i) 
                            return(
                                    <Fade left key = {i}>
                                        <div className="col-md-4 featured-responsive" key= {i}>
                                            <div className="featured-place-wrap" style = {{height : '400px'}}>
                                            <span className="featured-rating">{item.rating}</span>
                                                <a href = "javascript:void(0)"
                                                 onClick={ () => { this.changeRouteHandler(item.featured_detail_id+'/'+item.name) }}
                                                >
                                                <div style = {{height : '200px', overflow : 'hidden'}}>
                                                    <img src={item.bannerImage} className="img-fluid" alt="#" style = {{minHeight : '100%', width : '100%'}} />
                                                </div>
                                                    <div className="featured-title-box">
                                                        <h6>{item.name}</h6>
                                                        <p>
                                                            {item.foodType}
                                                        </p>
                                                        <span> • </span>
                                                        {
                                                            (item.opening_hours.open_now) ? 
                                                            (
                                                                 <p> <span>Open Now</span>  </p>
                                                            ) : (
                                                                 <p> <span> Close Now </span> </p>
                                                            )
                                                        }
                                                        <ul> 
                                                            <li style= {{lineHeight : 1.5}}>
                                                                <span className="fas fa-map-marker-alt"></span>
                                                                <p style = {{display : 'inline'}}>{item.formatted_address}</p>
                                                            </li>
                                                            <li>
                                                                <span className="fas fa-mobile-alt"></span>
                                                                <p>{item.formatted_phone_number}</p>
                                                            </li>
                                                            {/* <li>
                                                        <span className="icon-link"></span>
                                                        <a href={item.contact.fbPage}>{item.contact.fbPage}</a>
                                                            </li> */}
                
                                                        </ul>
                                                        {/* <div className="bottom-icons">
                                                            <div className="open-now">OPEN NOW</div>
                                                            <span className="ti-heart"></span>
                                                            <span className="ti-bookmark"></span>
                                                        </div> */}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </Fade>
                                )
                            }.bind(this))
                       ) : (
                        <div style = {{ paddingBottom:'50px', margin: '0 auto'}}>
                        <div className="loader" style ={{margin : '0 auto'}}></div>
                        </div>
                       )
                    }
                    </div>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <div className="featured-btn-wrap">
                                        <a href="javascript:void(0)" onClick={ () => { this.viewAllBtnHandler() }} className="btn dorne-btn">VIEW ALL</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </section>
        )
    } 
}

    function mapDispatchToProp(dispatch) {
        return ({
            changeRouteToOnBoardDetailedView : (id) => {
                dispatch(changeRouteToOnBoardDetailedView(id))
            },
            routeStringForListingComponent : (routeName) => {
                dispatch(routeStringForListingComponent(routeName))
            },
            UpdateTheStore : (action, list) => {
                dispatch(UpdateTheStore(action, list));
            }
        })
    }

    function mapStateToProp(state) {
        console.log(state)
        return ({
            featuredPlaces: state.root.featuredPlaces
        })
    }
    


export default connect(mapStateToProp, mapDispatchToProp)(FeaturedPlaces);