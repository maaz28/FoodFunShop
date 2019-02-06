import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './style.css'

let firstTime = true;
class SuggestPlaces extends Component {
    state = {
        value : "Enter Your Block & area"
    }
      /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect = (suggest) => {
    console.log(suggest);
    if(suggest){
        this.props.areaHandler(suggest.location)
    }
  }

  componentWillReceiveProps(prop){
      console.log(prop)
    //   console.log(this.props.locationAddress)
      if(prop.locationAddress){
          this.setState({
              value : prop.locationAddress
          })
      }
  }

  componentDidMount(){
      firstTime = true
  }

  onFocus = () => {
    if(firstTime){
        this.setState({
            value : ''
        })
        firstTime = false
    }
  }
 

    render() {
        return (
            <Geosuggest 
            minLength = {2} 
            initialValue = {this.state.value}
            inputClassName = "place" 
            onSuggestSelect={this.onSuggestSelect}
            onFocus = {this.onFocus}
            country = {['PK', 'AE']} 
            style = {{'input' : {padding: '0 20px 0 20px', height : '52px'}}}/>
        )
    } 
}


export default (SuggestPlaces);
