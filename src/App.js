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




function App() {
  return (
    <div className="App">
      <Navbar title="Product Details" about="About"></Navbar>

      <Router>
        <Routes>
          
          <Route path="/" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
