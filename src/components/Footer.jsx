import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-5">
      <div className="container">
        <div className="row text-center">

          {/* CONNECT WITH US */}
          <div className="col-md-4 mb-4">
            <div className="border rounded-5 p-3 bg-none h-100">
              <div className='mt-5'>
                <h4 className="text-primary">CONNECT WITH US</h4>
                <p className="mb-2"><FaPhoneAlt className="me-2" /> +91 9567483340</p>
                <p><FaEnvelope className="me-2" /> info@deepnetsoft.com</p>
              </div>
            </div>
          </div>

          {/* LOGO & SOCIAL MEDIA */}
          <div className="col-md-4 mb-4">
            <div className="border rounded-5 p-3 bg-none h-100 d-flex flex-column align-items-center">
              <h2 className="text-white mb-3">
                <div className='mt-5'><span className='text-primary'>DEEP</span> <span className="text-white">NET</span> <span className='text-dark'>SOFT</span></div>
              </h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaFacebookF className="text-light fs-4" />
                <FaTwitter className="text-light fs-4" />
                <FaInstagram className="text-light fs-4" />
                <FaLinkedinIn className="text-light fs-4" />
              </div>
            </div>
          </div>

          {/* FIND US */}
          <div className="col-md-4 mb-4">
            <div className="border rounded-5 p-5 bg-none h-100">
              <h4 className="text-primary">FIND US</h4>
              <p><FaMapMarkerAlt className="me-2" /> First Floor, Geo Infopark, Infopark EXPY, Kakkanad</p>
            </div>
          </div>

        </div>
      </div>
      
        {/* BOTTOM SECTION */}
        <div className="d-flex justify-content-between align-items-center flex-wrap bg-dark">
          <p className="ms-5 mt-3">© 2024 Deepnetsoft Solutions. All rights reserved.</p>
          <div>
            <a href="/terms" className="text-light text-decoration-none ms-5">Terms & Conditions</a>
            <a href="/privacy" className="text-light text-decoration-none ms-3">Privacy Policy</a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
