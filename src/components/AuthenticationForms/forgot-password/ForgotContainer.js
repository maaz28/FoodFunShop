
import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validEmail } from '../../../HelperFunctions/helper';
import ResetForm from './ResetForm';

class ForgotContainer extends Component{

    render(){
        const style = {
            position:'fixed',
            top: "50%",
            left: "50%",
            width :"30em",
            height :"18em",
            marginTop:"-9em", /*set to a negative number 1/2 of your height*/
            marginLeft: "-15em", /*set to a negative number 1/2 of your width*/
        }
return ( 
    <div style ={style}>
    <h4 style = {{margin : '8px'}}>Forgot Password</h4>
    <Divider />
    <ResetForm />
    </div> 
  )
}
}


export default (ForgotContainer)