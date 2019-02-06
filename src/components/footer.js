import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
    <div>
        <footer className="dorne-footer-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-md-flex align-items-center justify-content-between">
                        <div className="footer-text">
                            <p>
                                Copyright &copy;
                                <script>
                                    document.write(new Date().getFullYear());
                                </script> All rights reserved | This website is made with
                                <i className="fa fa-heart-o" aria-hidden="true"></i> by
                                <a href="" target="_blank">Team FoodFunShop</a>

                            </p>
                        </div>
                        <div className="footer-social-btns">
                            <a href="javascript:void(0)">
                                <i className="fa fa-instagram" aria-haspopup="true"></i>
                            </a>
                            <a href="https://twitter.com/foodfunshop?lang=en">
                                <i className="fa fa-twitter" aria-haspopup="true"></i>
                            </a>
                            <a href="https://www.facebook.com/FoodFunShop/">
                                <i className="fa fa-facebook" aria-haspopup="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
        )
    } 
}


export default (Footer);
