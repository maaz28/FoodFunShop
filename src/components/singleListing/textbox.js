import React, { Component } from 'react';


class TextBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            review : this.props.defaultValue
        }
    }

    submitHandler = () => {
        this.props.updateReviews(this.state.review);
    }

    writeReviewHandler = (ev) => {
        console.log(ev.target.value);
        this.setState({
            review : ev.target.value
        })
      }

    render() {
        return (
                <div class="form-group">
                            <textarea class="form-control" rows="2" onChange={this.writeReviewHandler}>{this.state.review}</textarea>
                            <button type="button" class="btn btn-success" onClick = {this.submitHandler}>Submit</button>
                </div>
        )
    }
}

export default (TextBox);
