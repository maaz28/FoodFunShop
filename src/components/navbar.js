import React, {
  Component
} from 'react';
import history from '../history'
import menuIconImg from '../img/menu-icon.png'
import Popup from 'reactjs-popup'
import Login from './AuthenticationForms/login';
import Signup from './AuthenticationForms/signup';
import {
  connect
} from 'react-redux';
import { isLoginAction, updateUserData, saveToken } from '../store/actions/action';

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, contentStyle : {width : '40%', padding : '15px'}, onMobileDevice : false };
  }

      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
      callBackendAPI = async () => {
        const response = await fetch('https://ffs-server-v3.herokuapp.com/admin/logout');
        // const response = await fetch('https://ffs-server-v3.herokuapp.com/places/all-featured-places');
        const body = await response.json();
        if (response.status !== 200) {
            console.log('ERRROR', body.message) 
            throw Error(body.message)
        } 
        return body;
    };

  // ********************************* functions for modal ************************************

  openModal = (ev) => {
    ev.preventDefault();
    var useragent = navigator.userAgent;
    this.setState({ open: true });
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
        this.setState({onMobileDevice : true, contentStyle : {width : '80%', padding : '15px'}})
    }
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  logoutHandler = () => {
    this.callBackendAPI().then((res) => console.log(res)); 
    this.props.isUserLogin(false)
  }

    // ********************************* Routes Handler ************************************
  ContactUsEventHandler(ev) {
    history.push('/contactUs')
  }
  aboutUsEventHandler(ev) {
    history.push('/aboutUs')
  }
  HomebtnHandler(ev) {
    history.push('/')
  }
  addListingbtnHandler(ev) {
    history.push('/addlisting')
  }

  // ********************************* update login state ************************************
  updateLoginState = (data) => {
      this.props.isUserLogin(true);
      this.props.userData(data);
      window.location.reload();
  }

  tokenHandler = (token) => {
    this.props.saveTokenHandler(token)
  }

  render() {
    return (
  <div>
      <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor : 'rgba(14, 2, 35, 0.9)',paddingLeft: '5%',paddingTop:'1%'}}>
              <a className="navbar-brand" href="/">FoodFunShop</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" style = {{backgroundImage : 'url('+menuIconImg+')'}}></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0)" onClick={this.HomebtnHandler.bind(this)}>Home
                          </a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0)" onClick={this.ContactUsEventHandler.bind(this)}>Contact</a>
                      </li>
                      <li className="nav-item"> 
                          <a className="nav-link" href="javascript:void(0)" onClick={this.aboutUsEventHandler.bind(this)}>About</a>
                      </li>
                  </ul>
                      {(this.props.isLogin) ? (
                  <form className="form-inline my-2 my-lg-0" style = {{marginRight : '15px'}}>
                          <div style={{color: 'white',marginRight: '11px'}}> Hi, {this.props.name} </div>
                          <button className="btn btn-outline-secondary" id="setting-margin" style={ {margin : '0 auto', color: 'white',padding:'4%',width: '150px', cursor:'pointer'}} type="submit" onClick={this.logoutHandler}>Logout</button>                      
                  </form>
                                            ) : (
                  <form className="form-inline my-2 my-lg-0" style = {{marginRight : '15px'}}>
                          <div style={{color: 'white',marginRight: '10px', cursor:'pointer'}} onClick={this.addListingbtnHandler.bind(this)}> +Add Listings </div>
                          <button className="btn my-2 my-sm-0" id="setting-margin" style={ {margin : '0 auto',backgroundColor: '#4B0082',color: 'white',padding:'4%',width: '150px', cursor:'pointer'}} type="submit" data-toggle="modal" data-target="#myModal" onClick={this.openModal} > Sign in or Register </button>
                        </form>
                      )}

              </div>
        <Popup 
          contentStyle = {this.state.contentStyle}
          open={this.state.open}
          closeOnDocumentClick 
          onClose={this.closeModal}
          modal = {true}
        >
        <div style = {{width : '90%', margin : 'auto'}}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true" style = {{color : '#341A79'}}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="signup-tab" data-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false" style = {{color : '#341A79'}}>Signup</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
              <Login updateLoginState = {this.updateLoginState} tokenHandler = {this.tokenHandler}/>
              </div>
              <div className="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab" tokenHandler = {this.tokenHandler}>
              <Signup updateLoginState = {this.updateLoginState} tokenHandler = {this.tokenHandler}/>
              </div>
            </div>
        </div>
        </Popup>
      </nav>
  </div>
    )
  }
}

function mapStateToProp(state) {
  return ({
      isLogin: state.user.isLogin,
      name : state.user.name
  })
}

function mapDispatchToProp(dispatch) {
  return ({
    isUserLogin : (boool) => {
          dispatch(isLoginAction(boool))
      },
      userData : (data) => {
        dispatch(updateUserData(data))
    },
    saveTokenHandler : (token) => {
      dispatch(saveToken(token))
    }
  })
}
 



export default connect(mapStateToProp, mapDispatchToProp)(CustomNavbar);