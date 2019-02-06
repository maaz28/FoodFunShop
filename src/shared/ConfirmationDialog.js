import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmationDialog extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(next){
    console.log(next)
    this.setState({
      open : next.open
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Thank You For Contacting Us"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            We've received your message and We'll get back to you asap.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;