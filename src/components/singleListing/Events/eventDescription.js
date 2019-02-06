import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { millisecondsToHour, millisecondsToDate } from '../../../HelperFunctions/helper'
// import { orange } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop : 26,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title : {
    color : '#4B237E'
  }
});

function dateConverter(milliseconds){
  console.log(milliseconds)
let dateObj = millisecondsToDate(milliseconds);
let str = dateObj.month + '/' + dateObj.date + '/' + dateObj.year;
console.log(str)
return (<span>{str}</span>)
}

function eventBtnHandler(link){
  window.location.href = link;
}

function eventStartingTime(milliseconds){
 let hours = millisecondsToHour(milliseconds);
 console.log(hours)
 return(<span>{hours}</span>) 
}


function EventDescription(props) {
  console.log(props);
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {/* <Typography variant="h5" component="h3">
          is a sheet of paper.
        </Typography> */}
        <Typography component="p">
        {props.data.description}
        </Typography>
        <br/>
        <Typography component="p">
        <p><span className = {classes.title}>Location : </span>{props.data.location}</p>
        <p><span className = {classes.title}>From :</span>{dateConverter(props.data.start_time)} <span className = {classes.title}>To :</span>{dateConverter(props.data.end_time)}</p>
        <p><span className = {classes.title}>Time :</span>{eventStartingTime(props.data.start_time)}</p>
        </Typography>
        <br/>
        <Typography component="p">
        <Button variant="outlined" color="primary" className={classes.button} onClick={() => {eventBtnHandler(props.data.fb_event_link)} }>
        Event On Facebook
      </Button>
        </Typography>
      </Paper>
    </div>
  );
}

EventDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventDescription);