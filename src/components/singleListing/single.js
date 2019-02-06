import React, { Component } from 'react';
import '../../css/contactStyling/style.css'
import { connect } from 'react-redux';
import BannerSlider from './bannerSlider'
// =======Dorne data==============
import {
    UpdateTheStore
} from '../../store/actions/action';
// =========color-lib Data=====================
// import EventsSlider from './eventsSlider';
import '../../css/SinglepageIcon.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import OnClickSlider from './modalImageSlider'


class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            expand : false,
            shortPhotosArr : []
        }
        // window.onbeforeunload = (e) => {
        //     return 'Stop this event';
        //   };
    }
       //Code to fetch list from the server goes Here
       componentDidMount() {
        // Call our fetch function below once the component mounts
            this.callBackendAPI()
            .then(res => {
                // this.props.foodListing(res);
                let localArr = [];
                localArr.push(res.data.result);
                this.setState({
                    detail: localArr
                });
                console.log(res)
                this.props.UpdateTheStore('SINGLE_DETAILS' ,res)
            })
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        var id;
        var name;
        if(window.location.href.includes('food/'))
        {
            var locationUrl = window.location.href.split('/');
            console.log(locationUrl)
            name = locationUrl.pop();
            id = locationUrl.pop();
        }
        else{
            id = this.props.singleId;
            name = '';
        }
        // Testing server Locally
        // const response = await fetch('https://https://ffs-server-v3.herokuapp.com/places/food/featured-place-details'+ id + '/' + name)
        const response = await fetch('https://ffs-server-v3.herokuapp.com/places/'+ id + '/' + name);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


    // createTable = (cost) => {
    //     let table = [];
    //     let p = [];
    //       //Inner loop to create children
    //       let str = '';
    //       for (let j = 0; j < cost; j++) {
    //         str += '<span></span>';
    //       }
    //       let remainingStr = ''
    //       for (let i = 0; i < 3-cost; i++) {
    //         remainingStr += '<span class="round-icon-blank"></span>';
    //       }
    //       //Create the parent and add the children
    //       table.push(<span>{str}{remainingStr}</span>)
    //       return(<span>{str}{remainingStr}</span>)
    //     // }
    //     // return table
    //   }


      photosArr(photos){
          let tempArr = [];
          let noOfImages = 0;
          if(photos.length < 3){
            noOfImages = photos.length;
          }
          else{
              noOfImages = 3;
          }
        for(var i=0; i<noOfImages; i++){
            tempArr.push(photos[i])
        }
        return(
            <div>
                <OnClickSlider photos = {tempArr}/>
                <button onClick = {() => {this.setState({expand : true})}}>More Photos</button>
            </div>
        )
      }
    

      // This function makes the array of photos from photo references returned by google
      photosArray(photosArray){
        let tempArr = [];
        for(var i=0; i<photosArray.length; i++){
            tempArr[i] = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference='+photosArray[i].photo_reference+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE'
        }
        return(tempArr)
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
        const GoogleMapExample = withGoogleMap(props => 
            {
                var latitude = Number(this.state.detail[0].geometry.location.lat);
                var longitude = Number(this.state.detail[0].geometry.location.lng);
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
          {
              (this.state.detail.length > 0) ? (
                this.state.detail.map(function(item, i){
                    return(
                        <div key = {i}>
                        <div style = {{width : '100%', height : '350px', overflow : 'hidden'}}>
                            <BannerSlider bannerImages = { this.photosArray(item.photos) }/>
                            </div>
                      {/* <img src={item.bannerImage} style = {{width : '100%', height : '450px'}}/> */}
  <section className="reserve-block">
          <div className="container">
              <div className="row">
                  <div className="col-md-6">
                      <h3 style={{padding:'0%',margin:'0%', display : 'inline'}}>{item.name}</h3>
                      <p><span><img src = 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png' style = {{width : '30%'}}/></span></p>
                          
                      <br/>       
                       {/* { <p><span>{item.foodType} </span></p> }  */}
                      <p className="reserve-description">{this.removingUnderScore(item.types[0])}</p>
                  </div>
                  <div className="col-md-6">
                      <div className="reserve-seat-block">
                          {<div className="reserve-rating">
                              <span style={{color:'white'}}>{
                                  (item.rating) ? (
                                      item.rating
                                  ) : (
                                      4.2
                                  )
                            
                            }
                              </span>
                          </div> }
                          { <div className="review-btn">
                          </div> }
                          <div className="reserve-btn">
                              <div className="featured-btn-wrap">
                          {/* <OnClickSlider menuArray = {item.menu} /> */}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
          
      <section className="light-bg booking-details_wrap" style = {{paddingBottom : '0px'}}>
          <div className="container">
              <div className="row">
                  <div className="col-md-7 responsive-wrap">
                  {
                      (typeof item.opening_hours !== "undefined") ? (
                        <div className="booking-checkbox_wrap">
                        <h4>Opening Hours</h4>
                                {
                                    item.opening_hours.weekday_text.map((item, i) => {
                                        return (
                            <div className="row" key = {i}>
                                <div className="col-md-6">
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
                <div className="booking-checkbox_wrap mt-4">
                    {(this.state.expand === true) ? (
                        <OnClickSlider photos = {item.photos}/>
                    ) : (
                        this.photosArr(item.photos)
                    )
                }
                      </div>
                  </div>
                  <div className="col-md-5 responsive-wrap">
                      <div className="contact-info">
                      
        <div>
          <GoogleMapExample
            containerElement={ <div style={{ height: `250px`, width: '100%' }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
            isMarkerShown
          />
        </div>           
                          {/* <img src="images/map.jpg" className="img-fluid" alt="#"//> */}
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
                                <a href={item.website} target = "_blank">{item.website}</a>
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
                              <p>{item.contact.timing} <br/>
                                  </p>
                          </div> */}
                          <a href="javascript:void(0)" className="btn btn-outline-danger btn-contact">SEND A MESSAGE</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section className="light-bg booking-details_wrap" style = {{padding : '0px'}}>
          <div className="container">
              <div className="row">
                  <div className="col-md-7 responsive-wrap">
                      {(item.reviews) ? (
                        <div className="booking-checkbox_wrap mt-4">
                                <div class="col-md-12 responsive-wrap">
                                <div class="booking-checkbox_wrap mt-4" style = {{padding : '10px'}}>
                                    <h5>{item.reviews.length} Reviews</h5>
                                    <hr/>
                      {
                          item.reviews.map((item, i) => { 
                              return(
                                  <div>
                                    <div class="customer-review_wrap">
                                        <div class="customer-img">
                                            <img src={item.profile_photo_url} class="img-fluid" alt="#"/>
                                            <p style = {{ whiteSpace : 'nowrap', overflow:'hidden'}} title = {item.author_name}>{item.author_name}</p>
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
                                            {/* <a href="#"><span class="icon-like"></span>Helpful</a> */}
                                        </div>
                                    </div>
                                    <hr/>
                                    </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                      
                      </div>
                      ) : (null)}
                      
                  </div>
                  <div className="col-md-5 responsive-wrap">
                      
                  </div>
              </div>
          </div>
      </section>
      </div>
      )
                }.bind(this))                   
              ) :  (
                  <div style = {{marginTop : '100px'}}>
                  <div class="loader" style ={{margin : '0 auto'}}></div>

                  </div>
              )
 
    
    }
            </div>
          ); 
    }
}

function mapStateToProp(state) {
    return ({
        singleId : state.root.singleId,
        singleDetails : state.root.singleDetails
    })
}


function mapDispatchToProp(dispatch) {
    return ({
        UpdateTheStore: (action, data)=>{
            dispatch(UpdateTheStore(action, data))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Single);
