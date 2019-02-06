import React, { Component } from 'react';
import post_request from '../../HelperFunctions/postRequest';
import {validEmail, validPassword} from '../../HelperFunctions/helper';
import {RadioGroup, Radio} from 'react-radio-group';
import TextField from '@material-ui/core/TextField';
import DatePickers from './dobPicker';  

var maleAvatarObject = [
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/1.jpeg?alt=media&token=079db7e3-d9ee-4f81-bc7b-88e319344f9f',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/2.jpeg?alt=media&token=c389252c-83e2-4bfc-818f-b4de2094d8b9',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/3.jpeg?alt=media&token=43620475-aa48-4996-8587-029466fabb10',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/4.jpeg?alt=media&token=29743e4e-2436-4b77-bde0-a0fa586c6e6b'
]
var femaleAvatarObject = [
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/5.jpeg?alt=media&token=de6c74ca-34cb-44e4-8cc0-02742205b44b',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/6.jpeg?alt=media&token=c0a55cfd-0eff-4ac0-8861-64543967e05f',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/7.jpeg?alt=media&token=08a5a29b-4315-451e-bd8d-484566aff0bc',
    'https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/8.jpeg?alt=media&token=70978300-b38c-4df9-8700-db01e26e6fde'
]

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            userName : '',
            selectedRadioValue : 'Male',
            imagesObj : {},
            profile_photo_url : '',
            dateOfBirth : '2014-08-18',
            menAvatarObject : {},
            womenAvatarObject : {}
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this)
        this.userNameHandler = this.userNameHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this)
    } 
    
    importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }

    componentDidMount() {
        const menAvatar = this.importAll(require.context('../../img/men-avatar', false, /\.(png|jpe?g|svg)$/));        
        console.log(menAvatar)
                // this.setState({
                //     imagesObj : maleAvatarObject
                // }) 

        const womenAvatar = this.importAll(require.context('../../img/women-avatar', false, /\.(png|jpe?g|svg)$/));        
        console.log(womenAvatar)
        this.setState({
        imagesObj : menAvatar,
        menAvatarObject : menAvatar,
        womenAvatarObject : womenAvatar
        })
    }

    handleChange = (value) => {
        let obj = {}
        if(value === 'Male'){
            obj = this.state.menAvatarObject;
            // obj = maleAvatarObject;
        }
        else if(value === 'Female'){
            obj = this.state.womenAvatarObject;
            // obj = femaleAvatarObject;
        }
        this.setState({selectedRadioValue: value, imagesObj : obj});
      }   

    emailHandler(ev){
        this.setState({
            email : ev.target.value
        })
    }

    passwordHandler(ev){
        this.setState({
            password : ev.target.value
        })
    }
    userNameHandler(ev){
        this.setState({
            userName : ev.target.value
        })
    }

    dateHandler = (date) => {
        this.setState({
            dateOfBirth : date
        })
    }

    signupHandler(ev){
        ev.preventDefault()
        if(!validEmail(this.state.email)){
            alert('email is not valid, Kindly enter valid email address !')
        }
        else if(!validPassword(this.state.password)){
            alert('password length should be atleast 8 characters long !')
        }
        else if(this.state.userName === ''){
            alert('User Name is required !')
        }
        else if(this.state.profile_photo_url === ''){
            alert('please select a photo !')
        }
        else{
            console.log(this.state.profile_photo_url);
            let obj = {
                email : this.state.email,
                password : this.state.password,
                name : this.state.userName,
                dateOfBirth : this.state.dateOfBirth,
                profile_photo_url : this.state.profile_photo_url,
                time : new Date(),
                gender : this.state.selectedRadioValue
            }
            console.log(obj);
            post_request('https://ffs-server-v3.herokuapp.com/admin/user-register', obj).then((res) => {
                console.log(res);
                if(res.responseCode === 201){
                    let token = res.data.result.token;
                    this.props.tokenHandler(token);
                    this.props.updateLoginState(res.data.result.user);
                }
                else if(res.responseCode === 500){
                    alert(res.responseMessage);
                }
            })
        } 
    }
    pictureSelected(id, category){
        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        // Get the size of an object
        var size = Object.size(this.state.imagesObj);
        for(var i=0; i<size; i++){
            document.getElementById(i).style.opacity = '1';            
        }
        document.getElementById(id).style.opacity = '0.3';
        let url;
        if(category === 'men'){
         url = maleAvatarObject[id];
        }
        else if(category === 'women'){
            url = femaleAvatarObject[id];
        }
        this.setState({
            profile_photo_url : url
        })
    }
 
    render() {
        return (
            <form>
                <DatePickers dateHandler = {this.dateHandler}/>
        <RadioGroup
        name="Gender"
        selectedValue={this.state.selectedRadioValue}
        onChange={this.handleChange}>
        <label>
          <Radio value="Male" />Male
        </label>
        <label>
          <Radio value="Female" />Female 
        </label>
      </RadioGroup>

    <label> Choose a Photo for your profile</label>
    <div className = 'row'>
    {
        (this.state.selectedRadioValue === "Male") ? (
            Object.keys(this.state.menAvatarObject).map((item, i) => {
  
              return(
            <div key = {i} className='col-3' >
              <img src={this.state.imagesObj[item]} id = {i} onClick = {this.pictureSelected.bind(this, i, "men")} alt = 'Avatar Pictures'/>
            </div>
              )
          })
        )
        :
        (
            Object.keys(this.state.womenAvatarObject).map((item, i) => {
                return(
              <div key = {i} className='col-3' >
                <img src={this.state.imagesObj[item]} id = {i} onClick = {this.pictureSelected.bind(this, i, "women")} alt = 'Avatar Pictures'/>
              </div>
                )
            })   
        )
    }
    </div>
        <TextField
        onChange = {this.userNameHandler}
        fullWidth
        style={{ margin: 8, marginLeft : 0 }}
          label="Full Name"
          variant="outlined"
        />
        <TextField
        fullWidth
        style={{ margin: 8, marginLeft : 0 }}
          label="Email"
          variant="outlined"
          onChange = {this.emailHandler}
          type = "email"
        />
        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        <TextField
         style={{ margin: 8, marginLeft : 0 }}
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange = {this.passwordHandler}
          fullWidth
        />
                <button 
                type="submit" 
                class="btn btn-success"
                onClick = {this.signupHandler}
             >Register</button>
            </form>
        )
    }
}

export default (Login);
