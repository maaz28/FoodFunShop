
import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validEmail } from '../../../HelperFunctions/helper';
import Message from '../../../shared/Message';
import post_request from '../../../HelperFunctions/postRequest';

class ResetForm extends Component{

    state = {
        email : "",
        error : false,
        successMessage : false
    }

    resetClickHandler = () => {
       if(validEmail(this.state.email)){
           post_request('https://ffs-server-v3.herokuapp.com/admin/forgot-password', {email : this.state.email})
           .then((res) => {
            console.log(res)
           })
        this.setState({
            successMessage : true
        })
        setTimeout(()=>{ //This function exit the
            this.setState({
                successMessage : false
            })
        }, 6000)
       }else{ 
           this.setState({
               successMessage : false,
               error : true
           })
       }
    }

    emailChangeHandler = (ev) => {
        this.setState({
            email : ev.target.value
        })
    }
    emailFocusHandler = () => {
        this.setState({
            error : false
        })
    }
 
    render(){
return ( 
    <React.Fragment>
    <TextField
        error = {this.state.error}
        fullWidth
        helperText = {(this.state.error) ? "Enter Valid Email Address" : "Password reset link will be send to this email"}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          onChange = {this.emailChangeHandler}
          onFocus = {this.emailFocusHandler}
    />
    <Button variant="contained" style = {{backgroundColor : '#4B0082', color : 'white'}} onClick = {this.resetClickHandler}>
        Reset Password
      </Button>
      <Message open = {this.state.successMessage} message = "Email Has Been Sent!"/>
    </React.Fragment> 
  )
}
}


export default (ResetForm)