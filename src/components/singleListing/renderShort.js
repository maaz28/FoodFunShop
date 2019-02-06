import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeRouteToOnBoardDetailedView
} from '../../store/actions/action';

class RenderShort extends Component {

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            arr : this.props.value
        }
    }

            //This function dispatch a function written in action.js to save ID of the place to be displayed in detail and to change the route
            changeRouteHandler(foodId){
                console.log(foodId);
                this.props.changeRouteToOnBoardDetailedView(foodId);
            }

    render() {
        return (
                <div className="row">
                { 
                            this.state.arr.map(function(item, i){
                              console.log(item, i);
                              return( <div className="col-md-4 col-lg-4 featured-responsive" key={i}>
                              <div className="featured-place-wrap">
                              {console.log(this)}
                                  <a onClick={ () => { this.changeRouteHandler(item.featured_detail_id+'/'+item.name) }}   >
                                      <img src={item.bannerImage} className="img-fluid" alt="displayImage" style = {{height : '140px'}}/>
                                      {/* <span className="featured-rating-orange">{item.rating}</span> */}
                                      <div className="featured-title-box" style = {{padding : '8px 8px'}}>
                                          <h6>{item.name}</h6>
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


export default connect(null,mapDispatchToProp)(RenderShort);
