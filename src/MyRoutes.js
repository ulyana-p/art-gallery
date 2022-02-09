import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './Components/About/About';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import EditProduct from './Components/Admin/EditProduct/EditProduct';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Cart from './Components/Cart/Cart';
import Contacts from './Components/Contacts/Contacts';
import Favorites from './Components/Favorites/Favorites';
import MyNavbar from './Components/Header/MyNavbar';
import Home from './Components/Home/Home';
import Checkout from './Components/Payform/Checkout';
import ProductDetail from './Components/Products/ProductDetail/ProductDetail';
import Products from './Components/Products/Products';
import ProductsContextProvider from './Context/ProductsContext';
import Footer from './Components/Footer/Footer'
import Reset from './Components/Auth/Reset/Reset';

const MyRoutes = () => {
    return (
        <ProductsContextProvider>
            <BrowserRouter>
                <MyNavbar/>
                <Routes>
                    <Route path='/add' element={<AddProduct/>}/>
                    <Route path='/edit/:id' element={<EditProduct/>}/>

                    <Route path='/' element={<Home/>}/>
                    <Route path='/detail/:id' element={<ProductDetail/>} />
                    <Route path='/cart' element={<Cart/>} />
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/favorites' element={<Favorites/>} />
                    <Route path='/payform' element={<Checkout/>} />
                    <Route path='/about' element={<About />}/>
                    <Route path='/contacts' element={<Contacts />}/>
                    <Route exact path="/reset" element={<Reset />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </ProductsContextProvider>
    );
};

export default MyRoutes;