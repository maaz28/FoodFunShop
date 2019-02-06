
import React, { Component } from 'react';
import post_request from '../../HelperFunctions/postRequest';
import TextField from '@material-ui/core/TextField';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import CircularLoader from '../../shared/CircularLoader';
import Grid from '@material-ui/core/Grid';
import { validEmail } from '../../HelperFunctions/helper';

const emailErrorText = "Email is not correct"

class ContactContainer extends Component {

	constructor(props) {
        super(props);
        this.state = {
            name: '',
            email : '',
			message : '',
			subject : '',
			open : false,
			loader : false,
			error : false
        };
	}
	

    nameHandler = (ev) => {
        this.setState({
            name: ev.target.value
        })
    }
    emailHandler = (ev) => {
        this.setState({
            email: ev.target.value
        })
    }
    messageHandler = (ev) => {
        this.setState({
            message: ev.target.value
        })
	}
    // contactHandler = (ev) => {
	// 	if (typeof ev.target.value === "string" && !Number.isNaN(Number(ev.target.value))) {
	// 		let expectedValue = Number(expectedValue);		
	// 		this.setState({
	// 			contact: ev.target.value
	// 		})
	// 	}
	// }
    subjectHandler = (ev) => {
        this.setState({
            subject: ev.target.value
        })
	}

	submitHandler = (ev) => {

		ev.preventDefault();
		let contact = {
			name : this.state.name,
			email : this.state.email,
			message : this.state.message,
			subject : this.state.subject
		};
		if(contact.subject === '' || contact.email === '' || contact.message === ''){
			alert('Some Required Fields are empty.')
		}
		else if(!validEmail(contact.email)){
			this.setState({
				error : true
			})
		}
		else{
			this.setState({
				loader : true
			})
			post_request('http://localhost:9000/contact-us', contact)
			.then((res) => {
				console.log(res);
				this.setState({
					open : true,
					loader : false,
					name : '', 
					email : '',
					message : '',
					subject : ''	
				})	
			})
		}
	}

	closeModal = () => {
		this.setState({
			open : false
		})
	}

	blurHandler = (ev) => {
		console.log(ev.target.value)
		if(!validEmail(ev.target.value)){
			this.setState({
				error : true
			})
		}
		else{
			this.setState({
				error : false
			})
		}
	}
	// style={{ backgroundImage: 'url(' + backgroundImg + ')', height: '300px', backgroundSize : 'cover', backgroundRepeat : 'no-repeat' }}
    render() {
        return (
			<div>
			{/* This div renders image specified by css */}
				    <div id= "contactUsImg">  				
					</div>
					<div class="dorne-contact-area d-md-flex" id="contact">
        {/* <!-- Contact Form Area --> */}
        <div class="contact-form-area equal-height">
            <div class="contact-text">
                <h4> Hello, Get in touch with us</h4>
                <p>FoodFunShop always open to communicate and make a community that love to share their experiences and help others in their vacation, trip plan, or to a select a random trip plan.</p>
				<br/>
				<p>FoodFunShop is always there and eager to answer any questions you may have. Enter your details and we'll get back to you shortly..</p>
                <div class="contact-info d-lg-flex">
                    <div class="single-contact-info">
                        <h6><i class="fa fa-map-signs" aria-hidden="true"></i>Chapal Ocean Center</h6>
                        <h6><i class="fa fa-map-signs" aria-hidden="true"></i>Clifton, Karachi, Pakistan. </h6>
                    </div>
                    <div class="single-contact-info">
                        <h6><i class="fa fa-envelope-o" aria-hidden="true"></i>info@foodfunshop.com</h6>
                        <h6><i class="fa fa-phone" aria-hidden="true"></i>+92 21 34166330</h6>
                    </div>
                </div>
            </div>
            <div class="contact-form">
                <div class="contact-form-title">
                    <h6>Contact Business</h6>
                </div>
                <form action="#">
                    <div class="row">
                        <div class="col-12 col-md-6">
						<TextField
						value = {this.state.name}
						fullWidth
						onChange = {this.nameHandler}
						label="Full Name"
						type="name"
						name="name"
						autoComplete="name"
						margin="normal"
						variant="outlined"
						/>
                            {/* <input type="email" name="email" class="form-control" placeholder="Email Address"/> */}
                        </div>
                        <div class="col-12 col-md-6">
						<TextField
						error = {this.state.error}
						value = {this.state.email}
						fullWidth
						required
						onChange = {this.emailHandler}
						onBlur = {this.blurHandler}
						helperText = {(this.state.error) ? ("Email is not corrected") : ("")}
						label="Email"
						type="email"
						autoComplete="email"
						margin="normal"
						variant="outlined"
						/>
                            {/* <input type="text" name="name" class="form-control" placeholder="Your Name"/> */}
                        </div>
                        <div class="col-12">
						<TextField
						value = {this.state.subject}
						required
						fullWidth
						onChange = {this.subjectHandler}
						label="Subject"
						type="text"
						name="text"
						margin="normal"
						variant="outlined"
						/>
                            {/* <input type="text" name="subject" class="form-control" placeholder="Subject"/> */}
                        </div>
                        <div class="col-12">
						<TextField
						value = {this.state.message}
						required
						fullWidth
						onChange = {this.messageHandler}
						multiline
						rows = "3"
						label="Message"
						name="email"
						autoComplete="email"
						margin="normal"
						variant="outlined"
						/>
                            {/* <textarea name="message" class="form-control" id="Message" cols="30" rows="10" placeholder="Your Message"></textarea> */}
                         </div>
                        <div class="col-12">
						<Grid container spacing={0}>
                                        <Grid item xs = {6}>
                            <button type="button" class="btn dorne-btn" style = {{marginTop : '8px'}} onClick ={this.submitHandler}>Send</button>
										</Grid>
										<Grid item xs = {6}>
										{
											(this.state.loader) ? <CircularLoader/> : (null)
										} 
							
										</Grid>
						</Grid>
						</div>
                    </div>
                </form>
				<ConfirmationDialog open = {this.state.open} closeModal = {this.closeModal}/>
            </div>
        </div>
        {/* <!-- Map Area --> */}
        <div class="dorne-map-area equal-height">
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.709404627975!2d67.02410281441007!3d24.805402284079964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb31626e782a9b9%3A0xedb4449347fff757!2sFood+Fun+Shop+Inc.!5e0!3m2!1sen!2s!4v1547446621314" width="100%" height="100%" frameborder="0" style={{border:"0"}} allowfullscreen></iframe>
            {/* <div id="googleMap"></div> */}
        </div>
    </div>
    {/* <!-- ***** Contact Area End ***** --> */}
            </div>
        )
    } 
}


export default (ContactContainer);