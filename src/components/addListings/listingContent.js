import React, {
    Component
} from 'react';
import backgroundImg from '../../img/resturant.jpg';
import '../../css/bootstrap/bootstrap.min.css';
import post_request from '../../HelperFunctions/postRequest';

class ListingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location : '',
            contact : ''
        }
    }

    nameHandler(ev) {
        this.setState({
            name: ev.target.value
        })
    }
    LocationHandler(ev){
        this.setState({
            location: ev.target.value
        })
    }
    ContactHandler(ev){
        if (typeof ev.target.value === "string" && !Number.isNaN(Number(ev.target.value))) {		
            this.setState({
                contact: ev.target.value
            })
		}

      
    }

    submitHandler(ev){
        ev.preventDefault();
        let obj = {
            name : this.state.name,
            location : this.state.location,
            contact : this.state.contact
        }
        post_request('https://ffs-server-v3.herokuapp.com/addListing', obj);
        alert('We will contact you shortly. Thank You For your interest.');
        this.setState({
            name: '',
            location : '',
            contact : ''
        })
    }


    render() {
        return (
<div>
    {/*
    <!-- ***** Add Listing Area Start ***** -->*/}
    <section className="dorne-welcome-area bg-img bg-overlay" style={{ backgroundImage: 'url(' + backgroundImg + ')' }}>
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="hero-content">
                            <h2>Hi, we're Food Fun Shop.</h2>
                            <h4>We help people discover You.</h4>
                    </div>
                    <div className="hero-search-form col-12 col-md-10">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-places" role="tabpanel">
                                <h6>Gain more traction by listing your business at FoodFunShop</h6>
                                <form style={{display: "Block"}} onSubmit = {this.submitHandler.bind(this)}>
                                    
                                    <span style = {{color : 'white'}}> Business Location</span>
                                    <div className="input-group input-group-lg " style={{marginBottom: '4%'}}>
                                        <input placeholder= "Location" title = 'where is your establishment located?' value={this.state.location} onChange={this.LocationHandler.bind(this)} type="text" className="form-control col-12 col-md-12" />
                                    </div>
                                    
                                    <span style = {{color : 'white'}}> Name of your Business </span>
                                    <div className="input-group input-group-lg " style={{marginBottom: '4%'}}>
                                    <input placeholder= "Name" value={this.state.name} title = 'name of your Business'  onChange={this.nameHandler.bind(this)} type="text" className="form-control col-12 col-md-12"
                                        />
                                    </div>
                                    <span style = {{color : 'white'}}> Contact Number </span>
                                    <div>
                                    <input placeholder="Number" value={this.state.contact} title='Your Contact Number' onChange={this.ContactHandler.bind(this)} type="text" className="form-control col-12 col-md-12" />
                                    </div>

                                        <button type="submit" className="btn dorne-btn col-2 col-md-2 col-sm-2" style = {{cursor : 'pointer'}}>
                                            <i className="fa fa-send pr-2" aria-hidden="true"></i> SEND</button>

                                    {/*
                                    <div style={{textAlign: 'center'}}> */} {/* </div> */} {/*
                                    <button type="submit" className="btn dorne-btn">
                                        <i className="fa fa-send pr-2" aria-hidden="true"></i> SEND</button> */}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*
        <!-- Hero Social Btn -->*/} {/*
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
        </div> */}
    </section>
    {/*
    <!-- ***** Add Listing Area End ***** -->*/}
</div>
        )
    }
}


export default (ListingContent);