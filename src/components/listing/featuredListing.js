import React, { Component } from 'react';
import CustomNavbar from '../navbar';
import Footer from '../footer';
import {
    changeRouteToOnBoardDetailedView
} from '../../store/actions/action';
import {
    connect
} from 'react-redux';

class FeaturedListing extends Component {
    state = {
        foodListLocal : []
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => {
                this.setState({
                    foodListLocal: res.data.results
                });
            })
            .catch(err => console.log(err));
    }
    //DiD mount Ends

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        var route = 'https://ffs-server-v3.herokuapp.com/places/all-featured-places';
        const response = await fetch(route);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

        //This function dispatch a function written in action.js to save ID of the place to be displayed in detail and to change the route
        changeRouteHandler(foodId){
            this.props.changeRouteToOnBoardDetailedView(foodId);
        }

    render() {
        return (
            <div>
                <CustomNavbar />
{            (this.state.foodListLocal.length > 0) ? (
    <section className="dorne-features-restaurant-area bg-default" style={{ backgroundColor : 'white'}}>
                    <div className="container">
                    <br/><br/>
                        <div className="row">
                            <div className="col-12">
                                <div className="section-heading text-center">
                                    
                                    <h4>Searched Places</h4>
                                </div> 
                            </div>
                        </div> 
                        <div className="row">
                    { 
                            this.state.foodListLocal.map(function(item, i){
                              return( <div className="col-md-3 col-lg-3 featured-responsive" key={i}>
                              <div className="featured-place-wrap">
                                  <a onClick={ () => { this.changeRouteHandler(item.featured_detail_id+'/'+item.name) }}   >
                                      <img src={item.bannerImage} className="img-fluid" alt="displayImage" style = {{height : '180px'}}/>
                                      <span className="featured-rating-orange">{item.rating}</span>
                                      <div className="featured-title-box">
                                          <h6>{item.name}</h6>
                                          <p>{item.category} </p> <span>•</span>
                                          {/* <p>34 Reviews</p> <span> • </span> */}
                                          <p><span>{item.foodType}</span></p>
                                          <ul>
                                              <li style = {{ whiteSpace : 'nowrap', overflow:'hidden'}} ><span className="fas fa-map-marker-alt"></span>
                                                  <p style = {{display : 'inline'}} >{item.formatted_address}</p>
                                              </li>
                                              <li><span className="fas fa-mobile-alt"></span>
                                                  <p style = {{display : 'inline'}}>{item.formatted_phone_number}</p>
                                              </li>
                                              {/* <li><span className="fas fa-link"></span>
                                                  <p style = {{display : 'inline'}}>{item.contact.fbPage}</p>
                                              </li> */}
                                              {/* {
                                                  (item.location.distance && item.location.duration) ? (
                                              <li>
                                                  <span>{Math.round(((item.location.distance/1000) / 10) * 10 ) } km</span> <span>{Math.round((item.location.duration / 60)) } min</span>
                                              </li>
                                                  ) : (null)
                                              } */}
                                          </ul>
                                          
                                      </div>
                                  </a>
                              </div>
                          </div>)
                            }.bind(this))  
                    }
                        </div>
                    </div>
                    </section>
    ) : (
        <div style = {{marginTop : '100px'}}>
        <div class="loader" style ={{margin : '0 auto'}}></div>
        </div>
    )
    }
                <Footer/>
            </div>
        )
    }
}

function mapDispatchToProp(dispatch) {
    return ({
        changeRouteToOnBoardDetailedView : (id) => {
            dispatch(changeRouteToOnBoardDetailedView(id))
        }
    })
}


export default connect(null,mapDispatchToProp)(FeaturedListing);