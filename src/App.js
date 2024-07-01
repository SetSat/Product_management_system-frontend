import './App.css';

import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { useSelector } from 'react-redux';
import { tokenStatus } from './Redux/authSlice';




function App() {
  const isLoggedin = useSelector(tokenStatus)
  return (
    <div className="App">
      <Router>
      {isLoggedin && (<Navbar title="Product Details" about="About"></Navbar>)}

      
        <Routes>

          {!isLoggedin && (<Route path='/' element={<LoginPage></LoginPage>}></Route>)}
          {!isLoggedin && (<Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>)}

          {isLoggedin && (<Route path="/product" element={<Products />} />)}

          {isLoggedin && (<Route path="/insertproduct" element={<InsertProduct />} />)}
          {isLoggedin && (<Route path="/updateproduct/:id" element={<UpdateProduct />} />)}
          {isLoggedin && (<Route path="/about" element={<About />} />)}




        </Routes>

      </Router>


    </div>
  );
}

export default App;