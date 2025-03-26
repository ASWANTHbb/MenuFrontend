import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the menu ID from the URL
import axios from 'axios';
import Header from '../components/Header';
import { SERVER_URL } from '../api/ServerUrl';  // Import your backend URL

function Item() {
  const { id } = useParams();  // Get menu ID from the URL
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/menus/${id}`);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  if (!menu) return <div className="text-center mt-5">Menu not found</div>;

  return (
    <div className='bg container-fluid'>
      <Header />
      <div className='container mt-5'>
        <h6 className='text-primary text-center text-md-start px-md-5' style={{ color: '#0796EF' }}>
          MENU &nbsp; &gt; &nbsp; {menu.name.toUpperCase()}
        </h6>
        <div className='row align-items-center justify-content-center text-center'>
          {/* Menu Image */}
          <div className='col-12 col-md-6 d-flex justify-content-center'>
            <img 
              src={menu.image || 'https://via.placeholder.com/400'}  // Fallback image
              alt={menu.name} 
              className='img-fluid rounded shadow-lg' 
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Menu Details */}
          <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-4 mt-md-0'>
            <div className='d-flex flex-column align-items-start w-100 p-3'>
              <h2 className='text-primary'>{menu.name}</h2>
              <h5 className='text-success'>${menu.price}</h5>
              <p className='text-center text-md-start' style={{ fontSize: '15px' }}>
                {menu.description}
              </p>
              <h6>Category: <span className="text-info">{menu.category}</span></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
