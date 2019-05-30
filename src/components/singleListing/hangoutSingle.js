import React, { Component } from 'react';
import '../../css/contactStyling/style.css'
import '../../css/SinglepageIcon.css';
import { connect } from 'react-redux';
import Footer from '../footer';
import CustomNavbar from '../navbar';
import {
    UpdateTheStore
} from '../../store/actions/action'; 
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import FeaturedOnClickSlider from './featuredOnClickSlider';
import RenderShort from './renderShort';
import Events from './Events'; 

//Tab Imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import SliderAndHeader from './hangoutTabItems/HangoutSliderAndHeader';
import { withStyles } from '@material-ui/core';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    selected: {
        color : 'black'
    },
  });

 
class HangoutSingle extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            expand: false,
            shortPhotosArr: [],
            all : [],
            value : 0
        }
    }
    //Code to fetch list from the server goes Here
    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => {
                console.log(res);
                // this.props.foodListing(res);
                let localArr = [];
                let allTemp = [];
                localArr.push(res.data.result);
                console.log(res.data.result.food);
                allTemp = res.data.result.food.concat(res.data.result.fun, res.data.result.shop)
                // allTemp.concat(res.data.result.food, )
                console.log(allTemp)
                this.setState({
                    detail: localArr,
                    all : allTemp
                });
                console.log(res)
                // this.props.UpdateTheStore('SINGLE_DETAILS' ,res)
            })
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        var id;
        var name;
        if (window.location.href.includes('hangout/')) {
            var locationUrl = window.location.href.split('/');
            console.log(locationUrl)
            name = locationUrl.pop();
            id = locationUrl.pop();
            console.log(id, name)
        }
        else {
            id = this.props.hangoutId;
            name = 'hangout';
        }
        console.log(this.props.hangoutId);
        const response = await fetch('https://ffs-server-v3.herokuapp.com/places/hangout/hangout-place-details/'+id+'/p')
        // const response = await fetch('https://ffs-server-v3.herokuapp.com/places/hangout/hangout-place-details/' + id + '/' + name)
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


    photosArr(photos) {
        let tempArr = [];
        let noOfImages = 0;
        if (photos.length < 3) {
            noOfImages = photos.length;
        }
        else {
            noOfImages = 3;
        }
        for (var i = 0; i < noOfImages; i++) {
            tempArr.push(photos[i])
        }
        return (
            <div>
                <FeaturedOnClickSlider photos={tempArr} />
                <button onClick={() => { this.setState({ expand: true }) }}>More Photos</button>
            </div>
        )
    }

    //Tab Event
    handleChange = (event, value) => {
      this.setState({ value });
    };

    
    render() {
        const { classes } = this.props;
        const GoogleMapExample = withGoogleMap(props => 
            {
                var latitude = Number(this.state.detail[0].geometry.location.lat);
                var longitude = Number(this.state.detail[0].geometry.location.lng);
            console.log(latitude, longitude )
           return(
            <GoogleMap
              defaultCenter = { { lat: latitude, lng:  longitude} }
              defaultZoom = { 15 }
            >
               {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} />}
            </GoogleMap>
           )
            }
         );
          return (
              <div>
            <CustomNavbar/>
          {
              (this.state.detail.length > 0) ? (
                this.state.detail.map(function(item, i){
                    console.log(item, i) 
                    return(
                        <div key={i}>
                        {/* ********************************** Render Image Slider And Header ************************************ */}
                        <SliderAndHeader
                        sliderImages = {item.sliderImages}
                        name = {item.name}
                        rating = {item.rating}
                        placeImages={item.placeImages}
                        />
                        <div className={classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
                                    <Tab label="Details" icon={<PhoneIcon />} />
                                    <Tab label="Events" icon={<FavoriteIcon />} />
                                </Tabs>
                            </AppBar>
                            {/* **************************** Details section Starts here ********************************** */}
                            {this.state.value === 0 && <TabContainer>
                                <section className="light-bg booking-details_wrap">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-8 responsive-wrap">
                    
                                                {/* ********************************* LIST OF THE ON BOARD RESTAURANTS
                                                ******************************************* */}
                    
                                                <div className="booking-checkbox_wrap">
                                                    <div className="booking-checkbox">
                                                        <p>{item.shortDescription}</p>
                                                    </div>
                                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab"
                                                                aria-controls="all" aria-selected="true">All</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="food-tab" data-toggle="tab" href="#food" role="tab"
                                                                aria-controls="food" aria-selected="false">Food</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="fun-tab" data-toggle="tab" href="#fun" role="tab"
                                                                aria-controls="fun" aria-selected="false">Fun</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="shop-tab" data-toggle="tab" href="#shop" role="tab"
                                                                aria-controls="shop" aria-selected="false">Shop</a>
                                                        </li>
                                                    </ul>
                                                    <div class="tab-content" id="myTabContent">
                                                        <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab"
                                                            style={{marginTop : '15px'}}>
                                                            <RenderShort value={this.state.all} />
                                                        </div>
                                                        <div class="tab-pane fade" id="food" role="tabpanel" aria-labelledby="food-tab"
                                                            style={{marginTop : '15px'}}>
                                                            <RenderShort value={item.food} />
                                                        </div>
                                                        <div class="tab-pane fade" id="fun" role="tabpanel" aria-labelledby="fun-tab" style={{marginTop : '15px'}}>
                                                            <RenderShort value={item.fun} />
                                                        </div>
                                                        <div class="tab-pane fade" id="shop" role="tabpanel" aria-labelledby="shop-tab"
                                                            style={{marginTop : '15px'}}>
                                                            <RenderShort value={item.shop} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="booking-checkbox_wrap mt-4">
                                                    <h3>Photos</h3>
                                                    {(this.state.expand === true) ? (
                                                    <FeaturedOnClickSlider menu={false} photos={item.placeImages} />
                                                    ) : (
                                                    this.photosArr(item.placeImages)
                                                    )
                                                    }
                                                </div>
                                                {(item.reviews) ? (
                                                <div className="booking-checkbox_wrap mt-4">
                                                    <div class="col-md-12 responsive-wrap">
                                                        <div class="booking-checkbox_wrap mt-4" style={{padding : '10px'}}>
                                                            <h5>{item.reviews.length} Reviews</h5>
                                                            <hr />
                                                            {
                                                            item.reviews.map((item, i) => {
                                                            return(
                                                            <div>
                                                                <div class="customer-review_wrap">
                                                                    <div class="customer-img">
                                                                        <img src={item.profile_photo_url} class="img-fluid" alt="javascript:void(0)" />
                                                                        <p style={{ whiteSpace : 'nowrap', overflow:'hidden'}} title={item.author_name}>{item.author_name}</p>
                                                                        {/* <span>35 Reviews</span> */}
                                                                    </div>
                                                                    <div class="customer-content-wrap">
                                                                        <div class="customer-content">
                                                                            <div class="customer-review">
                                                                                {/* {this.createTable(item.rating)} */}
                    
                                                                                <p>{item.relative_time_description}</p>
                                                                            </div>
                                                                            <div class="customer-rating">{item.rating}</div>
                                                                        </div>
                                                                        <p class="customer-text"> {item.text} </p>
                                                                        {/* <span>28 people marked this review as helpful</span> */}
                                                                        {/* <a href="javascript:void(0)"><span class="icon-like"></span>Helpful</a>
                                                                        */}
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                            )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                    
                                                </div>
                                                ) : (null)}
                                            </div>
                                            <div className="col-md-4 responsive-wrap">
                                                <div className="contact-info">
                    
                                                    <div>
                                                        <GoogleMapExample containerElement={ <div style={{ height: `250px`, width: '100%' }} />
                                                        }
                                                        mapElement={
                                                        <div style={{ height: `100%` }} /> }
                                                        isMarkerShown
                                                        />
                                                    </div>
                                                    {/* <img src="images/map.jpg" className="img-fluid" alt="javascript:void(0)"//> */}
                                                        <div className="address">
                                                    <span className="fas fa-map-marker-alt"></span>
                                                    <p> {item.formatted_address}</p>
                                                </div>
                                                {
                                                (item.formatted_phone_number) ? (
                                                <div className="address">
                                                    <span className="fas fa-mobile-alt"></span>
                                                    <p> {item.formatted_phone_number}</p>
                                                </div>
                                                ) :
                                                (null)
                                                }
                    
                                                {
                                                (item.website) ? (
                                                <div className="address">
                                                    <span className="fas fa-link"></span>
                                                    <p>
                                                        <a href={item.website} target="_blank">{item.website}</a>
                                                    </p>
                                                </div>
                                                ) : (null)
                                                }
                                                {/* <div className="address">
                                                    <span className="fab fa-facebook-f"></span>
                                                    <p>
                                                        <a href={item.contact.fbPage} target="_blank">{item.contact.fbPage}</a>
                                                    </p>
                                                </div> */}
                                                {/* <div className="address">
                                                    <span className="icon-clock"></span>
                                                    <p>{item.contact.timing} <br />
                                                    </p>
                                                </div> */}
                                                <a href="javascript:void(0)" className="btn btn-outline-danger btn-contact">SEND A MESSAGE</a>
                                            </div>
                                            {
                                            (typeof item.opening_hours !== "undefined") ? (
                                            <div className="booking-checkbox_wrap">
                                                <h3 style={{marginBottom : '15px'}}>Opening Hours</h3>
                                                {
                                                item.opening_hours.weekday_text.map((item, i) => {
                                                console.log(item, i)
                                                return (
                                                <div className="row" key={i}>
                                                    <div className="col-md-12">
                                                        <label className="custom-checkbox">
                                                            <span className="custom-control-description">{item}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                )
                                                })
                    
                                                }
                                            </div>
                                            )
                                            : (null)
                                            }
                                        </div>
                                    </div>
                        </div>
                        </section>
                        </TabContainer>}
                        {/* **************************** Details section ends here ********************************** */}
                    
                        {/* ********************************* Events Section ******************************************* */}
                        {this.state.value === 1 && <TabContainer>
                            <Events data = {item.event}/>
                        </TabContainer>}
                    </div>
                    
                    </div>
                    )
                    }.bind(this))
                    ) : (
                    <div style={{marginTop : '100px'}}>
                        <div class="loader" style={{margin : '0 auto'}}></div>
                    
                    </div>
                    )
                    }
                    <Footer />
                    </div>
          ); 
    }
}

function mapStateToProp(state) {
    return ({
        hangoutId : state.root.hangoutId
    })
}
    

function mapDispatchToProp(dispatch) {
    return ({
        UpdateTheStore: (action, data)=>{
            dispatch(UpdateTheStore(action, data))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp) (withStyles(styles)(HangoutSingle));