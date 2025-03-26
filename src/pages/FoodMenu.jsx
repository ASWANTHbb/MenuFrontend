import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'  // To get the current route
import Header from '../components/Header'
import '../pages/Home.css'
import Frame from '../assets/Frame.png'
import Frame1 from '../assets/Frame1.png'
import { Link } from 'react-router-dom'
import { SERVER_URL } from "../api/ServerUrl"
import cocktail2 from '../assets/cocktail1.png'
import cocktail3 from '../assets/cocktail.png'
import Footer from '../components/Footer'

function Home() {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const location = useLocation();

    // Extracting the current category from the route
    const getCategoryFromPath = () => {
        if (location.pathname.includes('/foodmenu')) return 'food';
        if (location.pathname.includes('/drinkmenu')) return 'drink';
        if (location.pathname.includes('/brunchmenu')) return 'brunch';
        return ''; 
    };

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/menus`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setMenu(data);

                    // Filter items by the current category
                    const currentCategory = getCategoryFromPath();
                    const filteredItems = data.filter(item => item.category === currentCategory);
                    setFilteredMenu(filteredItems);
                }
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, [location]);  // Trigger when the route changes

    return (
        <>
            <Header />
            <div className='start' style={{ overflowX: 'hidden' }}>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <h1 className='menu mt-5 p-4'>MENU - {getCategoryFromPath().toUpperCase()}</h1>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 d-flex align-items-center">
                            <p className='text-center p-3'>Explore our {getCategoryFromPath()} Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>

            <div className='third' style={{ overflowX: 'hidden' }}>
                <div className="row">
                    <div className="col-md-1 d-none d-md-block">
                        <img src={Frame} alt="no image" style={{ height: '70vh' }} />
                    </div>

                    <div className="col-md-10 p-4 position-relative">
                        {/* Cocktail Images */}
                        <img 
                            src={cocktail2} 
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
                            src={cocktail3} 
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
                            <h3 className='bru d-flex justify-content-center co'>——— {getCategoryFromPath().toUpperCase()} MENU ITEMS ———</h3>
                            
                            <div className='row'>
                                {filteredMenu.length > 0 ? (
                                    filteredMenu.map((item, index) => (
                                        <div className="col-12 col-md-6 mb-4" key={index}>
                                            <div className="mt-3 p-3" style={{ color: 'white' }}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to={`/menu/${item._id}`} style={{ textDecoration: 'none' }}>
                                                        <h6 style={{ marginBottom: '0' }}>
                                                            {item.name}
                                                            <span className="text-orange" style={{ float: 'right' }}>
                                                                ......................................................................{item.price}
                                                            </span>
                                                        </h6>
                                                    </Link>
                                                </div>
                                                <p style={{ color: 'grey', margin: '0' }}>{item.description}</p>
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
