import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
});


class DatePickers extends React.Component {
    state = {
        selectedDate: new Date('2014-08-18')
    }
    
    handleDateChange = date => {
        console.log(date.target.value)
        this.props.dateHandler(date.target.value)
        this.setState({ selectedDate: date.target.value });
      };

      render(){
          const { classes } = this.props;
          const { selectedDate } = this.state;
      return (
        // <form className={classes.container} noValidate>
        <div>
          <TextField
          value={selectedDate}
          onChange={this.handleDateChange}
            fullWidth = {true}
            style={{ margin: 8, marginLeft : 0 }}
            id="date"
            label="Date Of Birth"
            type="date"
            className={classes.textField}
          />
        </div>
      );
      }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
