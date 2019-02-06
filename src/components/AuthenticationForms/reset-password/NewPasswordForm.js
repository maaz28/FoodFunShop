
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validEmail } from '../../../HelperFunctions/helper';
import Message from '../../../shared/Message';

class NewPasswordForm extends Component{

    state = {
        password : "",
        confirmPassword : "",
        error : false,
        successMessage : false,
        passwordError : false,
        confirmPasswordError : false
    }

    resetClickHandler = () => {
       if( (this.state.password !== "") && (this.state.password === this.state.confirmPassword)){
        
        this.setState({
            confirmPasswordError : false,
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
               confirmPasswordError : true
           })
       }
    }

    // emailChangeHandler = (ev) => {
    //     this.setState({
    //         email : ev.target.value
    //     })
    // }

    // emailFocusHandler = () => {
    //     this.setState({
    //         error : false
    //     })
    // }

    passwordHandler = (ev) => {
        this.setState({
            password : ev.target.value
        })
    }

    confirmPasswordHandler = (ev) => {
        this.setState({
            confirmPassword : ev.target.value
        })   
    }

    passwordBlurHandler = () => {
        if(this.state.password.length < 8){
            this.setState({
                passwordError : true
            })
        }else{
            this.setState({
                passwordError : false
            })   
        }
    }
 
render(){
return ( 
    <React.Fragment>
    <TextField
        error = {this.state.passwordError}
        helperText = {(this.state.passwordError) ? "Password Shouldn't be less than 8 characters" : "Password should be atleast 8 charaters long"}
        fullWidth
          label="Password"
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
          variant="outlined"
          onChange = {this.passwordHandler}
          onBlur = {this.passwordBlurHandler}
    />
    <TextField
        error = {this.state.confirmPasswordError}
        helperText = {(this.state.confirmPasswordError) ? "Password Doesnot match" : ""}
        fullWidth
          label="Confirm Password"
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
          variant="outlined"
          onChange = {this.confirmPasswordHandler}
    />
    <Button variant="contained" style = {{backgroundColor : '#4B0082', color : 'white'}} onClick = {this.resetClickHandler}>
        Update Password
      </Button>
      <Message open = {this.state.successMessage} message = "Password is Updated Sucessfully!"/>
    </React.Fragment> 
  )
}
}


export default (NewPasswordForm)