import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import CartDetails from './Components/CartDetails';


const App = () => {
    const [cart, setCart] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
                <Route path="/cartDetails" element={<CartDetails cart={cart} setCart={setCart} />} />
            </Routes>
        </Router>
    );
};

export default App;
