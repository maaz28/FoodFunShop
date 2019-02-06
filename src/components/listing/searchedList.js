import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    foodListing, changeRouteToDetailedView
} from '../../store/actions/action';

class SearchedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodListLocal: {},
            category : ''
        }
    }

    //Code to fetch list from the server goes Here
    componentDidMount() {
        // Call our fetch function below once the component mounts
        console.log( "FetchROute******************@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", this.props.listingRoute)
        this.callBackendAPI(this.props.listingRoute)
            .then(res => {
                console.log("GoogleAPI response",res.results);
                this.props.foodListing(res.data.results);
                let category = res.data.results.category;
                delete res.data.results.category;
                this.setState({
                    foodListLocal: res.data.results,
                    category : category
                });
            })
            .catch(err => console.log(err));
    }
    // /allFeaturedPlaces /foodListing/lon/lat 
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async (fetchRoute) => {
        var route = fetchRoute;
        const response = await fetch(route);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

//This function dispatch a function written in action.js to save ID of the place to be displayed in detail and to change the route
    changeRouteHandler(foodId){
        console.log(foodId);
        this.props.changeRouteToDetailedView(foodId);
    }

    //This function structured the address to fitted accordingly in the render method
    renderAddress(address){
        console.log(address);
        let split = address.split(' ');
        let addressString = address.replace(split[0], '')
        return <p style = {{display : 'inline'}}>{addressString}</p>
    }
    renderImage(ref){
        let route = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference='+ref+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE';
        return(
            // <img src = {route} style = {{height : '200px', width: '100%'}}/>
            <div style = {{height : '200px', overflow : 'hidden'}}>
            <img src = {route} style = {{minHeight : '100%', width: '100%'}}/>
            </div>
        )
        // console.log(route)
        // this.callBackendAPI(route, {mode: 'no-cors'})
        // .then(res => {
        //     console.log("GoogleAPI Image response",res);
        //     // return(<img />)
        // })
        // .catch(err => console.log(err));
    }

    removingUnderScore(type){
        if(type.includes('_')){
            let temp = type.split('_');
            let str = '';
            for(var i=0; i<temp.length; i++){
                str += temp[i] + ' ';
            }
            return str;
        }
        else{
            return type
        }
    }

    render() {

        for (var key in this.state.foodListLocal) {
            if (this.state.foodListLocal.hasOwnProperty(key)) {
                 this.state.foodListLocal[key]
            }
        }

        return (
            <div>
{            (!(Object.keys(this.state.foodListLocal).length === 0 && this.state.foodListLocal.constructor === Object )) ? (
<section className="dorne-features-restaurant-area bg-default" style={{ backgroundColor : 'white'}} >
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
                        Object.keys(this.state.foodListLocal).map(function(item, i){ 
                            console.log(item, this.state.foodListLocal)
                            return (
                                this.state.foodListLocal[item].map(function(item, i){
                                    console.log(item, i);
                                      return( 
                                      <div className="col-md-4 col-lg-3 featured-responsive" key={i}>
                                      <div className="featured-place-wrap">
                                          <a onClick={ () => { this.changeRouteHandler(this.state.category + '/place-details/'+ item.place_id + '/' + item.name) }}>
                                            { 
                                                 (typeof item.photos !== "undefined") ? (
                                                  this.renderImage(item.photos[0].photo_reference)
                                              ) : (
                                                  <div style = {{height : '200px', overflow : 'hidden'}}>
                                                      <img src= "https://via.placeholder.com/400x400" alt="displayImage" style = {{minHeight : '100%', width : '100%'}}/>
                                                  </div>
                                              )
                                              }
                                          {
                                            //   Check for rating property in object
                                            //   - Default is 4.4
                                            (item.rating) ? (
                                                <span className="featured-rating-orange">{item.rating.toFixed(1)}</span>
                                            ) : (
                                                <span className="featured-rating-orange">4.0</span>
                                            )    
                                              }
            
                                              <div className="featured-title-box">
                                                  <h6 title = {item.name}>{item.name}</h6>
                                                 <div style = {{ whiteSpace : 'nowrap', overflow:'hidden'}}>
                                                 <p>{this.removingUnderScore(item.types[0])} </p> <span>• </span>
                                                  {
                                                 ( typeof item.opening_hours !== "undefined" ) ? (
                                                     (item.opening_hours.open_now) ? (
                                                        <p><span>Open Now</span></p>
                                                     ) : (
                                                         <p><span>Closed Now</span></p>
                                                     )
                                                 ) : null
                                                  }
                                                 </div>
                                              
                                                  <ul>
                                                      <li style = {{ whiteSpace : 'nowrap', overflow:'hidden'}}><span className="fas fa-map-marker-alt"></span>
                                                      { // Calling function to render address here
                                                      ( typeof item.plus_code !== "undefined" ) ? (
                                                          this.renderAddress(item.plus_code.compound_code)
                                                      ) : (
                                                        this.renderAddress(item.vicinity)
                                                      )
                                                      }
                                                          {/* <p style = {{display : 'inline'}}>{item.contact.area}</p> */}
                                                      </li>
                  
                                                  </ul>
                                                  
                                              </div>
                                          </a>
                                      </div>
                            </div>)
                                    }.bind(this))  
                        )}.bind(this))
                    }
               
                    </div>
                </div>
                </section>
) : (
    <div style = {{marginTop : '100px'}}>
    <div className="loader" style ={{margin : '0 auto'}}></div>
    </div>
)
}
                
            </div>
        )
    }
}


function mapDispatchToProp(dispatch) {
    return ({
        foodListing: (list)=>{
            dispatch(foodListing(list))
        },
        changeRouteToDetailedView : (id) => {
            dispatch(changeRouteToDetailedView(id))
        }
    })
}

function mapStateToProp(state) {
    return ({
        listingRoute : state.root.listingRoute,
        foodListSorted : state.root.foodListSorted,

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SearchedList);