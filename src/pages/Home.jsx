import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../pages/Home.css'
import Frame from '../assets/Frame.png'
import Frame1 from '../assets/Frame1.png'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/Logo.png'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { SERVER_URL } from "../api/ServerUrl";
import cocktail from '../assets/cocktail1.png'
import cocktail1 from '../assets/Cocktail.png'

function Home() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
          try {
            const response = await fetch(`${SERVER_URL}/menus`);
            const data = await response.json();
            console.log(data);
            setMenu(data)
            console.log(menu.length);
            
            
            if (data.success) {
                console.log(data);
                
              setMenu(data.menu);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };

        fetchMenu();
    }, []);

    return (
        <>
            <Header />
            <div className='start' style={{ overflowX: 'hidden' }}>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <h1 className='menu mt-5 p-4'>MENU</h1>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 d-flex align-items-center">
                            <p className='text-center p-3'>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
            <div className='sec' style={{ overflowX: 'hidden' }}>
                <div className='d-flex justify-content-center gap-3'>
                    <Link to='/foodmenu'><button className='btn-custom mt-3'>Food</button></Link>
                    <Link to='/'><button className='btn-custom mt-3'>Drink</button></Link>
                    <Link to='/brunch'><button className='btn-custom mt-3'>Brunch</button></Link>
                </div>
            </div>
            <div className='third' style={{ overflowX: 'hidden' }}>
                <div className="row">
                    <div className="col-md-1 d-none d-md-block">
                        <img src={Frame} alt="no image" style={{ height: '70vh' }} />
                    </div>
                    <div className="col-md-10 p-4 position-relative">
    {/* Cocktail Image on the Top-Left Corner */}
    <img 
        src={cocktail} 
        alt="cocktail" 
        style={{ 
            position: 'absolute', 
            top: '0px', 
            left: '30px', 
            width: '100px', 
            height: 'auto', 
            zIndex: '1' 
        }} 
    />
     <img 
        src={cocktail1} 
        alt="cocktail" 
        style={{ 
            position: 'absolute', 
            bottom: '0px', 
            right: '30px', 
            width: '100px', 
            height: 'auto', 
            zIndex: '1' 
        }} 
    />

    <div className='mt-5' style={{ border: '1px solid #857878', borderRadius: '10px', position: 'relative', zIndex: '0' }}>
        <h3 className='bru d-flex justify-content-center co'>——— MENU ITEMS ———</h3>
        
        <div className='row d-flex justify-content-between'>
            {menu.length > 0 ? (
                menu.map((menu, index) => (
                    <div className="col-12 col-md-6 mb-4" key={index}>
                        <div className="mt-3 p-3" style={{ color: 'white' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to={`/menu/${menu._id}`} style={{textDecoration:'none'}}>
                                    <h6 style={{ marginBottom: '0' }}>
                                        {menu.name}
                                        <span className="text-orange" style={{ float: 'right' }}>......................................................................{menu.price}</span>
                                    </h6>
                                </Link>
                            </div>
                            <p style={{ color: 'grey', margin: '0' }}>{menu.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-center'>No products available</p>
            )}
        </div>
    </div>
</div>

                    <div className="col-md-1 d-none d-md-block">
                        <img src={Frame1} alt="no image" style={{ height: '70vh' }} />
                    </div>
                    
                </div>
                
            </div>
            <Footer />   
        </>
    )
}

export default Home;
