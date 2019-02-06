import React from 'react';
import BannerSlider from '../bannerSlider';
import FeaturedOnClickSlider from '../featuredOnClickSlider';

const SliderAndHeader = (props) => {
        return(
            <div>
            <div style={{width : '100%', height : '350px', overflow : 'hidden'}}>
                <BannerSlider bannerImages={ props.sliderImages} />
            </div>
            <section className="reserve-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 style={{padding:'0%',margin:'0%', display : 'inline'}}>{props.name}</h3>
                            {/* <br /> */}
                            {/* <p className="reserve-description">{props.shortDescription}</p> */}
                        </div>
                        <div className="col-md-6">
                            <div className="reserve-seat-block">
                                {<div className="reserve-rating">
                                    <span style={{color:'white'}}>{
                                        (props.rating) ? (
                                        props.rating
                                        ) : (
                                        4.2
                                        )
                                        }
                                    </span>
                                </div> }
                                { <div className="review-btn">
                                </div> }
                                <div className="reserve-btn">
                                    <div className="featured-btn-wrap">
                                        < FeaturedOnClickSlider menu={true} photos={props.placeImages} buttonName="Hangout Images" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                </div>
        )
    }

export default SliderAndHeader;