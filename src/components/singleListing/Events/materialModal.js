import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleSlider from './modalSlider';
import EventDescription from './eventDescription';

class ScrollDialog extends React.Component {
  state = {
    open: false,
    event : {}
  };

  // handleClickOpen = scroll => () => {
  //   this.setState({ open: true, scroll });
  // };

  componentWillReceiveProps(newProp){
    console.log(newProp)
    this.setState({
      open : newProp.open,
      event : newProp.event
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>z
        <Dialog
        maxWidth = 'md'
          open={this.state.open}
          onClose={this.handleClose}
          scroll= 'paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.state.event.title}</DialogTitle>
          <DialogContent>
          <SimpleSlider photos = {this.state.event.photos} videos = {this.state.event.video}/>
            <DialogContentText> 
              <EventDescription data = {this.state.event} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ScrollDialog;