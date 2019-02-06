import React, { Component } from 'react';
import CustomNavbar from '../../navbar';
import NewPasswordContainer from './NewPasswordContainer';

class ResetPassword extends Component{
    render(){
return ( 
    <div>
    <CustomNavbar/>
    <NewPasswordContainer/>
    </div> 
  )
}
}


export default (ResetPassword);