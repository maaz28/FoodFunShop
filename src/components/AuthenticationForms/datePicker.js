import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
export default class DOBPicker extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        // startDate: moment("01/01/1999")
        startDate: moment("01/01/1999")
      };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(date) {
      this.setState({
        startDate: date
      });
      console.log(typeof(date))
      // console.log(date === null)
      if(date !== null){
        this.props.dateHandler(date._d)
      }
    }
   
    render() {
      return <DatePicker
          dateFormat="DD/MM/YYYY"
        //   openToDate={moment("01/01/1999")}
          selected={this.state.startDate}
          onChange={this.handleChange}
      />;
    }
  }