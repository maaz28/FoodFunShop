import React, { Component } from 'react';
import '../../css/contactStyling/style.css'
import { connect } from 'react-redux';
import BannerSlider from './bannerSlider';
import Footer from '../footer';
import TextBox from './textbox'
// =======Dorne data==============
import {
    UpdateTheStore
} from '../../store/actions/action';
// =========color-lib Data=====================
// import EventsSlider from './eventsSlider';   
import '../../css/SinglepageIcon.css';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import FeaturedOnClickSlider from './featuredOnClickSlider';
import Chat from '../ChatWidjet/chat';
import post_request from '../../HelperFunctions/postRequest';
import updateData from '../../HelperFunctions/putRequest';
import {reorder} from '../../HelperFunctions/helper';
import ReactStars from 'react-stars';
import CustomNavbar from '../navbar';
import SendMessageButton from './sendMessage'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

var ratingValue = 0;
const ratingChanged = (newRating) => {
    ratingValue = newRating
  }  

class OnBoardSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            expand : false,
            shortPhotosArr : [],
            rating : 0,
            reviewed : false,
            reviewArr : [],
            update : false
        }
    }
        
        
        //Code to fetch list from the server goes Here
        componentDidMount() {
            // Call our fetch function below once the component mounts
            // addResponseMessage("Welcome to this awesome chat!");
            this.callBackendAPI()
            .then(res => {
                console.log(res);
                // this.props.foodListing(res);
                let localArr = [];
                localArr.push(res.data.result);
                this.setState({
                    detail: localArr
                });
                console.log(res.data.result.reviews);
                this.ifTheReviewExist(res.data.result.reviews, this.props.uuid);
                this.props.UpdateTheStore('SINGLE_DETAILS' ,res.data.result)
            })
            .catch(err => console.log(err));
        };
        
        ifTheReviewExist = (reviewArr, uuid) => {

            let that = this;
            let arr = this.state.detail;
            reviewArr.forEach(function (arrayItem, index) {
                if (arrayItem.userId === uuid)
                {
                    console.log(index)
                    console.log(reorder(reviewArr, index));
                    let sortedReview = reorder(reviewArr, index);
                    arr[0].reviews= sortedReview;
                    that.setState({
                       detail : arr, 
                       reviewed : true
                    })
                }
            });
        }

        // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        var id;
        var name;
        if(window.location.href.includes('d/'))
        {
            var locationUrl = window.location.href.split('/');
            console.log(locationUrl)
            name = locationUrl.pop();
            id = locationUrl.pop();
            console.log(id, name);
        }
        else{
            id = this.props.singleId;
            name = '';
        }
        
        // const response = await fetch('https://ffs-server-v3.herokuapp.com/places/food/featured-place-details/'+ id + '/' + name)
        const response = await fetch('https://ffs-server-v3.herokuapp.com/places/food/featured-place-details/'+ id + '/' + name);
        // const response = await fetch('https://ffs-server-v3.herokuapp.com/places/'+ id);
        const body = await response.json();
        
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };
    
    

    

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
                <FeaturedOnClickSlider photos = {tempArr}/>
                <button onClick = {() => {this.setState({expand : true})}}>More Photos</button>
            </div>
        )
      }

      createTable = (cost) => {
        let table = [];
        let p = [];
          let str = '';
          for (let j = 0; j < cost; j++) {
            str += '$';
          }
          let remainingStr = ''
          for (let i = 0; i < 3-cost; i++) {
            remainingStr += '$';
          }
          //Create the parent and add the children
          table.push(<p><span>{str}</span>{remainingStr}</p>)
          
        // }
        return table
      }

      addReview(review){
        var dateInSeconds = new Date().getTime();
        let placeID = this.removeRestaurantName(this.props.singleId);
        console.log(ratingValue)
          let userName =this.props.name;
          console.log(userName);
          let arr = this.state.detail;
          let reviewObj = {
            placeId : placeID,
            text : review,
            author_name : userName,
            rating : ratingValue,
            profile_photo_url: this.props.profile_photo_url,
            time : dateInSeconds,
            userId : this.props.uuid,
            'x-access-token' : this.props.token
        };
        console.log(reviewObj);
          post_request('https://ffs-server-v3.herokuapp.com/admin/featured/'+reviewObj.placeId+'/review', reviewObj)
          .then((res) => {console.log(res)        
          reviewObj._id = res.data.result._id;
          arr[0].reviews.push(reviewObj);
          this.setState({
             detail : arr, 
             reviewed : true
          })
        })
      }


      removeRestaurantName(str){
        let splitStr = str.split('/');
        return splitStr[0];
    }

    // **************************************** Review Handlers ************************************************

    deleteReviewHandler  (id, ind) {
        post_request('https://ffs-server-v3.herokuapp.com/admin/featured/'+id+'/review/delete', {'x-access-token' : this.props.token}).then((res) => {
            if(res.responseCode === 201){
                let arr = this.state.detail;
                arr[0].reviews.splice(ind, 1)
                this.setState({
                    details : arr,
                    reviewed : false
                })
            }
            else{
                alert(res.responseMessage)
            }
        })
    }

    editReviewHandler  () {
            this.setState({
                update : true
            })    
        // updateData('https://ffs-server-v3.herokuapp.com/admin/featured/'+id+'/review', {'x-access-token' : this.props.token}).then(res => {
        //     if(res.responseCode === 201){
        //     }
        // });
    }

    editReviews (id, ind, review) {
        console.log(ind)
        // console.log(id + 'id', review + 'review');
        var dateInSeconds = new Date().getTime();
        let placeID = this.removeRestaurantName(this.props.singleId);
        console.log(ratingValue)
          let userName =this.props.name;
          console.log(userName);
          let arr = this.state.detail;
          let reviewObj = {
            placeId : placeID,
            text : review,
            author_name : userName,
            rating : ratingValue,
            profile_photo_url: this.props.profile_photo_url,
            time : dateInSeconds,
            userId : this.props.uuid,
            'x-access-token' : this.props.token
        };
        updateData('https://ffs-server-v3.herokuapp.com/admin/featured/'+id+'/review', reviewObj).then(res => {
            if(res.responseCode === 201){
                console.log('success')
                reviewObj._id = id;
                console.log(res);
                let arr = this.state.detail;
                arr[0].reviews[ind] = reviewObj;
                this.setState({
                    detail : arr,
                    reviewed : true,
                    update : false
                })
            }   
        });

        console.log(reviewObj);
    }

    render() {
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
                        <div key = {i}>
                        <div style = {{width : '100%', height : '350px', overflow : 'hidden'}}>
                            <BannerSlider bannerImages = { item.sliderImages}/>
                            </div>
                      {/* <img src={item.bannerImage} style = {{width : '100%', height : '450px'}}/> */}
  <section className="reserve-block">
          <div className="container">
              <div className="row">
                  <div className="col-md-6">
                      <h3 style={{padding:'0%',margin:'0%', display : 'inline'}}>{item.name}</h3>
                          {this.createTable(item.cost)}
                      <br/>       
                      <p className="reserve-description">{item.shortDescription}</p>
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
                          <FeaturedOnClickSlider menu = {true} photos = {item.menuImages}  />
                              </div>
                          </div> 
                      </div>
                  </div>
              </div>
          </div>
      </section>
          
      <section className="light-bg booking-details_wrap">
          <div className="container">
              <div className="row">
                  <div className="col-md-7 responsive-wrap">
                  <div className="booking-checkbox_wrap">
                          <div className="booking-checkbox">
                              <p>{item.description}</p>
                          </div>
                          </div>
                      <div className="booking-checkbox_wrap mt-4">
                    {(this.state.expand === true) ? (
                        <FeaturedOnClickSlider menu = {false} photos = {item.placeImages}  />
                    ) : (
                        this.photosArr(item.placeImages)
                    )
                }
                      </div>
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
                                      {(item.userId === this.props.uuid && this.props.isLogin && this.state.update) ? (
                                      <span>
                                      <ReactStars
                                      count={5}
                                      onChange={ratingChanged}
                                      size={24}
                                      color2={'#ffd700'}
                                      />
                                      <TextBox defaultValue = {item.text} updateReviews = {this.editReviews.bind(this, item._id, i)}/>
                                      </span>    
                                      ) : (
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
                                        {(item.userId === this.props.uuid && this.props.isLogin) ? 
                                        
                                        (
                                            <div>
                                                <DeleteIcon onClick = {this.deleteReviewHandler.bind(this, item._id, i)} style ={{cursor : 'pointer', color : 'red'}} title = 'Delete'/>
                                                <EditIcon onClick = {this.editReviewHandler.bind(this)} style = {{cursor : 'pointer', color : 'blue', marginLeft : '8px'}} title = 'Edit'/>
                                            </div>
                                        )
                                        
                                            // (<span> <i class="far fa-edit" onClick = {this.editReviewHandler.bind(this)} style = {{cursor : 'pointer', color : 'blue', paddingRight : '15px'}} title = 'Edit'></i> <i class="fas fa-trash" onClick = {this.deleteReviewHandler.bind(this, item._id, i)} style ={{cursor : 'pointer', color : 'red'}} title = 'Delete'></i> </span>) 
                                            : (null)}
                                        {/* <span>28 people marked this review as helpful</span> */}
                                        {/* <a href="#"><span class="icon-like"></span>Helpful</a> */}
                                    </div>
                                </div>
                                <hr/>
                                </div>
                                      )}

                                    </div>
                                    )
                                })
                            }
                            
                            {/********************** Show write a review text box if the user logged in *******************/}
                              {
                                  (this.props.isLogin && !this.state.reviewed)?(
                                <span>
                                    <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    color2={'#ffd700'}
                                    />
                              <TextBox defaultValue = '' updateReviews = {this.addReview.bind(this)}/>
                              </span>
                                  ) : null
                              }
                            </div>
                        </div>
                      </div>
                      ) : (null)}
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
                          {
                              (item.facebookUrl) ? (
                                <div className="address">
                                <span className="fab fa-facebook"></span>
                                <p>
                                <a href={item.facebookUrl} target = "_blank">{item.facebookUrl}</a>
                                </p>
                            </div> 
                              ) : (null)
                          }
                          <SendMessageButton whatsappNumber = {item.whatsappNumber || ''}/>
                      </div>
                      {/* Opening Hours Check */}
                      {
                      (typeof item.opening_hours !== "undefined") ? (
                        <div className="booking-checkbox_wrap">
                        <h3 style = {{marginBottom : '15px'}}>Opening Hours</h3>
                                {
                                    item.opening_hours.weekday_text.map((item, i) => {
                                        console.log(item, i)
                                        return (
                            <div className="row" key = {i}>
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
      </div>
      
      )
                }.bind(this))                   
              ) :  (
                  <div style = {{marginTop : '100px'}}>
                  <div class="loader" style ={{margin : '0 auto'}}></div>

                  </div>
              )
    }
    <Footer/>
    {(this.props.isLogin && this.props.formatted_phone_number) ? (
    <Chat/>
    ) : (null)}
            </div>
          ); 
    }
}

function mapStateToProp(state) {
    return ({
        name : state.user.name,
        uuid : state.user.uuid,
        isLogin : state.user.isLogin,
        profile_photo_url : state.user.profile_photo_url,
        token : state.user.token,
        singleId : state.root.singleId,
        singleDetails : state.root.singleDetails,
        formatted_phone_number : state.root.formatted_phone_number
    })
}


function mapDispatchToProp(dispatch) {
    return ({
        UpdateTheStore: (action, data)=>{
            dispatch(UpdateTheStore(action, data))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(OnBoardSingle);