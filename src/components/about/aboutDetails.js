import React, { Component } from 'react';
import access from '../../img/aboutImage/Access.png';
import scan from '../../img/aboutImage/Scan.png';
import enjoy from '../../img/aboutImage/Enjoy.png';
import Slide from 'react-reveal/Slide';//Library For animation

class AboutDetails extends Component {
    render() {
        return (
<div>
    <div id='aboutUsbackgroundImg'>
    <div style = {{margin : 'auto', width : 'fit-content', top : '50%'}}>About Us</div> 
    </div>
    <div style={{ backgroundColor: '#F0F0F0', }}>
        <p style={{ textAlign: 'center', marginLeft: '10%', marginRight: '10%', fontSize: '100%', lineHeight:
            '2' }}> Gone are the days where you need 4 different applications for 4 different kinds of commodities,
            FoodFunShop aims to provide our clients and customers a single hub with all the functionality. It's special feature of QR code let you know what you want. </p>
    </div>
    <div>
    <div className="about-content text-center">
    <br/>
    <br/>
                        <h2>HOW IT WORKS <br/><span>FF&S</span></h2>
                        {/* <p>Find Food, Fun Places or place to Shop.In a neighbourhood or city. Order online, not just Food.</p> */}
                    </div>
        <div className='row' style = {{margin : '50px 0 50px 0'}}>

            <div className="col-md-4 col-sm-4">
                <img src={ scan}  style = {{display : 'block', margin : '0 auto', paddingBottom : '50px'}}/> {/*
                <div style={{ backgroundImage: 'url(' + order + ')', backgroundRepeat: 'no-repeat',marginTop: '4%' }}></div> */}
            </div>

            <div className="col-md-4 col-sm-4">
                {/* style={{ backgroundImage: 'url(' + relax + ')', backgroundRepeat:'no-repeat'}} */}
                <img src={access} style = {{display : 'block', margin : '0 auto', paddingBottom : '50px'}}/>
            </div>

            <div className="col-md-4 col-sm-4">
                {/* style={{ backgroundImage: 'url(' + enjoy + ')', height: '350px' , backgroundRepeat:'no-repeat',marginTop:'3%'}} */}
                <img src={enjoy} style = {{display : 'block', margin : '0 auto', paddingBottom : '50px'}}/>
            </div>
        </div>
        {/* <div style={{ backgroundImage: 'url(' + sitBackImg + ')', height: '100px' }}></div> */}
    </div>
    
    
    <div style={{ backgroundColor: '#7643E9', }}>
        <Slide left>
            <div style={{ marginLeft: '7%', marginRight: '7%', fontSize: '100%', lineHeight: '2', paddingTop:
                '3%', paddingBottom: '3%' }}>
                <h3 style={{ color: 'white', }}>Our Mission</h3>
                <p style={{ color: 'white', }}>
                <p className = 'white-padding'>
                "We at FoodFunShop have one simple mission,
                </p>
                <p className = 'white-padding'>
                To connect every buyer in the world to every seller all in one place
                  We want to make this a platform for the convenience of our customers, providing them a one-stop solution to all their needs.
                </p>
                    <p className = 'white-padding'>
                    For us, It's not just about bringing you good foodfrom your favourite restaurants. It's about making a connection,
            which is why we sit down with the chefs, dreaming up menus that will arrive fresh and full of floavours"
                    </p>

              
{/* "Bringing good food into your everyday. That's our mission.
                   
                     That means we don't just deliver--we bring it, always going the extra mile to make your experience memorable.
                    
                     And it means this is delicious food you can enjoy everyday: from vibrant salads for healthy office lunches,
                    to indulgent family-sized pizzas, to fresh sushi for a romantic night in. Whatever you crave, we can
                    help." */}
                </p>
            </div>
        </Slide>

    </div>
</div>
        )
    }
}


export default (AboutDetails);