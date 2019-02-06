import React, { Component } from 'react';
import post_request from '../../HelperFunctions/postRequest'
import {validEmail, validPassword} from '../../HelperFunctions/helper'
import TextField from '@material-ui/core/TextField';
import history from '../../history';

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    // validEmail(email){
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(email);
    // }

    emailHandler(ev){
        console.log(validEmail(ev.target.value));
        this.setState({
            email : ev.target.value
        })
    }

    passwordHandler(ev){
        this.setState({
            password : ev.target.value
        })
    }

    loginHandler(ev){
        ev.preventDefault()
        if(validEmail(this.state.email) && validPassword(this.state.password)){
            let obj = {
                email : this.state.email,
                password : this.state.password
            }
            post_request('https://ffs-server-v3.herokuapp.com/admin/user-login', obj).then((res) => {
                // post_request('https://ffs-server-v3.herokuapp.com/admin/get-all-users', {'x-access-token' : token});
                // this.callBackendAPI('https://ffs-server-v3.herokuapp.com/admin/get-all-users', token).then((res) => console.log(res, 'REponse')).catch(err => console.log(err));
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
        else{
            alert('email is not valid, Kindly enter valid email address !')
        }
    }

    forgotPasswordHandler = () =>{
        history.push('/forgot-password');
    }

    render() {
        return (
            <form style = {{marginTop : '20px'}}>
        <TextField
        fullWidth
        style={{ margin: 8, marginLeft : 0 }}
          id="outlined-dense"
          label="Email"
          variant="outlined"
          onChange = {this.emailHandler}
          type = "email"
        />
         <TextField
         style={{ margin: 8, marginLeft : 0 }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange = {this.passwordHandler}
          fullWidth
        />
        <p style = {{cursor : 'pointer', color : '#341A79', textDecoration : 'underline'}} onClick = {this.forgotPasswordHandler}>forgot password?</p>
                <button 
                style={{ margin: 8, marginLeft : 0 }}            
                type="submit" 
                className="btn btn-success" 
                onClick = {this.loginHandler}>Login</button>
            </form>
        )
    } 
}

export default (Login);