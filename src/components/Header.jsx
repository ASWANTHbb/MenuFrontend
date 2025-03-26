import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 992);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" style={{ backgroundColor: '#121618' }}>
      <Container>
        
        {/* Logo container */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className={`d-flex align-items-center justify-content-center position-relative ${isCollapsed ? 'mx-auto' : ''}`} 
          style={{ transition: '0.3s' }}
        >
          <img src={logo} alt="Logo" style={{ 
            position: 'absolute', 
            top: '0px', 
            left: '0px', 
            width: '70px', 
            height: 'auto', 
            zIndex: '1' 
        }} />
          {!isCollapsed && (
            <h5 style={{ color: '#0796EF', position: 'absolute', 
              top: '10px', 
              left: '80px', 
              width: '50px', 
              height: 'auto', 
              zIndex: '1' }}>
              DEEP <span style={{ color: 'white' }}>NET</span> <br />
              <span style={{ color: '#857878' }}>SOFT</span>
            </h5>
          )}
        </Navbar.Brand>

        {/* Toggle button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto mt-2 ">
            <Nav.Link as={Link} to="/" className="nav-hover">HOME</Nav.Link>
            <Nav.Link as={Link} to="/menu" className="nav-hover">MENU</Nav.Link>
            <Nav.Link as={Link} to="/addproduct" className="nav-hover">ADD ITEMS</Nav.Link>
            <Nav.Link as={Link} to="/reservation" className="nav-hover">MAKE A REGISTRATION</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-hover">CONTACT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
