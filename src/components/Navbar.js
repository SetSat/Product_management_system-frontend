import React from 'react';

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-light fs-4" aria-current="page" href="/">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-light fs-4" aria-current="page" href="/about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
