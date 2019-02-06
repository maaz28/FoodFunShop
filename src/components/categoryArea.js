import React, { Component } from 'react';
import funIcon from "../img/core-img/icon-1.png";
import RestaurantsIcon from "../img/core-img/icon-2.png";
import ShoppingIcon from "../img/core-img/icon-3.png";
import Bounce from 'react-reveal/Bounce';
import Popup from "reactjs-popup";
import SuggestPlaces from './locationSearch/geoSuggest';
import Grid from '@material-ui/core/Grid';
import {
    connect
} from 'react-redux';
import {
    routeStringForListingComponent
} from '../store/actions/action';
class CategoryArea extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false,
            category: '',
            city : 'karachi',
            area : '24.9207/67.0882',
            onMobileDevice : false,
            AllowCurrentLocation : false,
            contentStyle : {width : '28%', padding : '16px'},
            locationColor : '#417080'
        };
      }

      // ******************** METHODS OPEN ************************* //

      openModal = (cat) => {
          this.setState({ open: true, category : cat });
      };

      closeModal = () => {
        this.setState({ open: false });
      };

      cityHandler(ev){
        console.log(ev.target.value)
        this.setState({
            city: ev.target.value
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
        let obj = {
            category : this.state.category,
            city : this.state.city,
            area : this.state.area
        }
        this.props.routeStringForListingComponent('https://ffs-server-v3.herokuapp.com/places/'+this.state.category+'/'+this.state.area);
}

detectCurrentLocation(){
    this.setState({
        locationColor : 'darkblue'
    })
    var options = {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0 
      };
    navigator.geolocation.getCurrentPosition((pos) => {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        this.setState({
            area : lat + '/' + lon,
            AllowCurrentLocation : true
        })
        alert('Your Current Location has been selected.')    
    }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      , options);
}
    // ******************** METHODS ************************* //

    render() {
        return (
    <section className="dorne-catagory-area">
    <Popup
    contentStyle = {this.state.contentStyle}
    open={this.state.open}
    closeOnDocumentClick
    onClose={this.closeModal}  
    position="bottom center" 
    modal = {true}>
    <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-places" role="tabpanel" aria-labelledby="nav-places-tab">
                                        <h6 style = {{marginBottom : '15px'}}>Explore all the {this.state.category} places near your area!</h6>
                                        <form onSubmit={this.searchBtnHandler.bind(this)}>
                                        <div>
                                    <Grid container spacing={0}>
                                        <Grid item xs = {3}>                                        
                                        <select disabled className="custom-select" value={this.state.category} style = {{height : 'calc(2.25rem + 16px)'}}>
                                                <option value="food">Food</option>
                                                <option value="fun">Fun</option>
                                                <option value="shop">Shop</option>
                                            </select> 
                                        </Grid>
                                        <Grid item xs>
                                            <SuggestPlaces areaHandler = {this.areaHandler}/>
                                        </Grid>
                                    </Grid>
                        </div>
                                            <button type="submit" className="btn dorne-btn" style = {{marginTop : '15px'}}>
                                                <i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button>
                                                {(this.state.onMobileDevice) ? (
                                                    <a href= {'javascript:void(0)'} onClick={this.detectCurrentLocation.bind(this)} style={{display : 'block', paddingTop : '15px', color : this.state.locationColor, textDecoration : 'underline'}} >Use My Current Location</a>
                                                ) : (   
                                                    null
                                                )}
                                        </form>
                                    </div>
                                </div>
  </Popup>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="all-catagories">
                        <Bounce bottom cascade>
                        <div className="row">
                            {/* <!-- Single Catagory Area --> */}
                            {/* <Bounce bottom> */}
                            <div className="col-12 col-sm-6 col-md" style = {{cursor : 'pointer'}}  onClick={ () => this.openModal('fun')}>
                                <div className="single-catagory-area">
                                    <div className="catagory-content">
                                        <img src={funIcon} alt="funIcon"/>
                                        <a href="javascript:void(0)">
                                            <h6>Fun</h6>
                                        </a>
                                    </div>
                                </div>
                            </div> 
                            {/* </Bounce> */}
                            {/* <!-- Single Catagory Area --> */}
                            {/* <Bounce bottom> */}
                            <div className="col-12 col-sm-6 col-md" style = {{cursor : 'pointer'}}  onClick={ () => this.openModal('food')}>
                                <div className="single-catagory-area">
                                    <div className="catagory-content">
                                        <img src={RestaurantsIcon} alt=""/>
                                        <a href="javascript:void(0)">
                                            <h6>Restaurants</h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* </Bounce> */}
                            {/* <!-- Single Catagory Area --> */}
                            {/* <Bounce bottom> */}
                            <div className="col-12 col-sm-6 col-md" style = {{cursor : 'pointer'}}  onClick={ () => this.openModal('shop')}>
                                <div className="single-catagory-area">
                                    <div className="catagory-content">
                                        <img src={ShoppingIcon} alt=""/>
                                        <a href="javascript:void(0)">
                                            <h6>Shopping</h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* </Bounce> */}
                        </div>
                        </Bounce>
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
        routeStringForListingComponent : (routeName) => {
            dispatch(routeStringForListingComponent(routeName))
        }
    })
}


export default connect(null, mapDispatchToProp) (CategoryArea);