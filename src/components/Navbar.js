import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tokenStatus, logout } from '../Redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import './Navbar.css';

export default function Navbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector(tokenStatus);

  // Decode the token to get user information
  const token = jwtDecode(tokenFromRedux);
  const userName = token.user.name;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <Menu mode="horizontal" theme="light" className="glassy-navbar">
        <Menu.Item key="products">
          <Link to="/product" className="nav-link">
            Products
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </Menu.Item>
        <div className="navbar-right">
          <span className="user-name">{userName}</span>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Menu>
    </div>
  );
}
