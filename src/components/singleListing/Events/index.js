import React, { Component } from 'react';
import backgroundImg from '../../../img/bg-img/hero-3.jpg'
import CustomizeModal from './modal'
import ScrollDialog from './materialModal';
import { millisecondsToDate } from '../../../HelperFunctions/helper';

class Events extends Component {

    state = {
        open : false,
        data : ''
    }

    openModal = (item) => {
        this.setState({
            open : true,
            data : item
        })
    }

    eventStartDate(milliseconds){
    let obj = millisecondsToDate(milliseconds);
    let str = obj.date + ' '+ obj.month;
    return str;
    }

    render() {
        return (
            <div>
                        <section class="dorne-features-events-area bg-img bg-overlay-9 section-padding-100-50" 
                        style={{ backgroundImage: 'url(' + backgroundImg + ')' }}>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="section-heading text-center">
                                        <span></span>
                                        <h4>Featured events</h4>
                                        <p>Editor’s pick</p>
                                    </div>
                                </div>
                            </div>
                    {/* <CustomizeModal open = {this.state.open}/>          */}
                            <div class="row">
                        { this.props.data.map((item, i) => {
                            console.log(item) 
                            return(
                                <div 
                                key = {i} 
                                class="col-12 col-lg-6" 
                                onClick = {this.openModal.bind(this, item)} 
                                style = {{cursor : 'pointer'}} 
                                >
                                    <div class="single-feature-events-area d-sm-flex align-items-center wow fadeInUpBig" data-wow-delay="0.7s">
                                        <div class="feature-events-thumb">
                                            <img src={item.title_image} alt=""/>
                                            <div class="date-map-area d-flex">
                                                <a href="#">{this.eventStartDate(item.start_time)}</a>
                                            </div>
                                        </div>
                                        <div class="feature-events-content" style = {{overflow : 'hidden'}}>
                                            <h5>{item.title}</h5>
                                            <h6>{item.location}</h6>
                                            <p style = {{ whiteSpace : 'nowrap'}}>{item.description}</p>
                                        </div>
                                        <div class="feature-events-details-btn">
                                            <a href="#">+</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                        {(this.state.open) ? (
                            <ScrollDialog  open = {this.state.open} event = {this.state.data}/> 
                            ) :
        (null)
                        }
                            </div>
                        </div>
                    </section>
            </div>
           
        )
    } 
}


export default (Events);
