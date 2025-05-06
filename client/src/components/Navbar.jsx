import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img.png'; // adjust if your logo path is different

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img 
            src={logo} 
            alt="Health Center Logo" 
            style={{ 
              width: '50px', 
              height: '50px',
              marginRight: '15px' // Added space between logo and text
            }} 
          />
          <a 
            className="navbar-brand" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            style={{ marginRight: '0' }} // Ensures no extra margin
          >
            Health Center
          </a>
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                Contact
              </a>
            </li>
        
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;