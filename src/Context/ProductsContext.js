import React, { createContext, useEffect, useReducer, useState } from 'react';
import { db, auth } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc, getDoc, deleteDoc, query, orderBy, startAfter, limit, startAt } from 'firebase/firestore'
import { calcSubPrice, calcTotalPrice, getProductsInCart } from '../Helpers/CalcPrice';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { API } from '../Helpers/Constants'
import axios from 'axios'
import Email from '@mui/icons-material/Email';


export const productContext = createContext()

const INIT_STATE = { 
    products: null,
    edit: null,
    paginatedPages: 1,
    detail: {},
    cart: {},
    cartLength: 0,
    favorites: {},
    favoritesLength: 0,
    userData: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers ['x-total-count'] / 3)
            }
        case 'GET_PRODUCT_TO_EDIT':
            return {
                ...state, edit: action.payload
            }
        case 'GET_PRODUCT_DETAIL':
            return {
                ...state, detail: action.payload
            }
        case 'GET_CART':
            return {
                ...state, cart: action.payload
            };
        case 'CHANGE_CART_COUNT':
            return {
                ...state, cart: action.payload
            }; 
        case 'CHANGE_FAVOURITES_COUNT':
            return {
                ...state, favorites: action.payload
            }; 
        case 'GET_FAVORITES':
            return {
                ...state, favorites: action.payload
            };
        case 'GET_COMMENTS':
            return {
                ...state, userData: action.payload
            };    
        default:
            return state
    }
}

const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
 

    //! Create
    const addProduct = async (newProduct) => {
        try{
            let res = await axios.post(API, newProduct)
            getProducts()
            return res
        } catch (error) {
            console.log(error);
        }
    }

    //! Read
    const getProducts = async () => {
        try{
           let res = await axios(`${API}${window.location.search}`)
           let action = {
               type: 'GET_PRODUCTS',
               payload: res            
           }
           dispatch(action)
        //    console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    //! update
    const editProduct = async (id) => {
        try {
            let res = await axios(`${API}/${id}`)
            let action = {
                type: 'GET_PRODUCT_TO_EDIT',
                payload: res.data
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }

    //! Save edited product
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
        } catch (error) {
            console.log(error);
        }
    }

    //! Delete
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API}/${id}`)
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    //! get detail
    const getDetail = async (id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: 'GET_PRODUCT_DETAIL',
            payload: res.data
        }
        dispatch(action)
    }


    //! Cart

    const addProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if(filteredCart.length > 0){
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        } else {
            cart.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: 'CHANGE_CART_COUNT',
            payload: cart.products.length
        })
    }

    
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: 'CHANGE_CART_COUNT',
            payload: cart.products.length
        })
    }

    
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: 'GET_CART',
            payload: cart
        })
    }

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if(elem.item.id === id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }

    //! end of cart
    //! DeleteFromCart 
 
    const deleteFromCart =(id, price)=>{ 
        let items = JSON.parse(localStorage.getItem('cart')) 
        for (let i =0; i< items.products.length; i++) { 
          let targetItem = JSON.parse(items.products[i].item.id); 
          let targetItemPrice = JSON.parse(items.products[i].item.price); 
           
          if (targetItem == id) { 
              items.products.splice(i, 1); 
          } 
          if (targetItemPrice == price){ 
            items.totalPrice = items.totalPrice - price 
          } 
    } 
      items = JSON.stringify(items); 
    //   console.log(items) 
      localStorage.setItem("cart", items); 
      getCart() 
    }

    //! SignIn / SignUP
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = async (email, password) => {
        // return signInWithEmailAndPassword(auth, email, password)
        try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (err) {
            console.error(err);
            alert('Wrong password');
          }
    }

    function useAuth () {
        const [currentUser, setCurrentUser] = useState()

        useEffect(() => {
            const unsub = onAuthStateChanged(auth, user => 
               setCurrentUser(user))
               return unsub
        }, [])

        return currentUser
    }

    function logout(){
        return signOut(auth)
    }

    //!reset password

    const sendPasswordReset = async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Password reset link sent!");
        } catch (error) {
          console.error(error);
        }
      };

    //! favorites

    const addProductInFavorites = (product) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if(!favorites){
            favorites = {
                products: [],
            }
        }
        let newProduct = {
            item: product
        }

        let filteredFav = favorites.products.filter(elem => elem.item.id === product.id)
        if(filteredFav.length > 0){
            favorites.products = favorites.products.filter(elem => elem.item.id !== product.id)
        } else {
            favorites.products.push(newProduct)
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites))
        dispatch({
            type: 'CHANGE_FAVOURITES_COUNT',
            payload: favorites.products.length
        })
    }

    
    const getFavoritesLength = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if(!favorites){
            favorites = {
                products: []
            }
        }
        dispatch({
            type: 'CHANGE_FAVOURITES_COUNT',
            payload: favorites.products.length
        })
    }
    
    const getFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if(!favorites){
            favorites = {
                products: [],
            }
        }
        dispatch({
            type: 'GET_FAVORITES',
            payload: favorites
        })
    }

    const checkProductInFavorites = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if(!favorites){
            favorites = {
                products: [],
            }
        }
        let newFav = favorites.products.filter(elem => elem.item.id === id)
        return newFav.length > 0 ? true : false
    }

    
    //! DeleteFromFavorites
    const deleteFromFavorites =(id)=>{ 
        let items = JSON.parse(localStorage.getItem('favorites')) 
        for (let i =0; i< items.products.length; i++) { 
          let targetItem = JSON.parse(items.products[i].item.id);            
          if (targetItem === id) { 
              items.products.splice(i, 1); 
          } 
         
    } 
      items = JSON.stringify(items); 
    //   console.log(items) 
      localStorage.setItem("favorites", items); 
      getFavorites() 
    }
    //! end of favorites

    //todo Comments

    const userCollectionRef = collection(db, "comments")
    // console.log('comments:', userCollectionRef);
    
    const addUserData= async (newUser) => {
        try {
            let res = await addDoc(userCollectionRef, newUser)
            return res
        } catch (error) {
            console.log(error);
        }
    }

    const getUserData = async () => {
        try {
            const data = await getDocs(userCollectionRef)
            console.log(data.docs);
            let res = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))
            let action = {
                type: 'GET_COMMENTS',
                payload: res
            }
            dispatch(action)
        } catch (error) {
            console.log('GET_COMMENTS_ERR', error);
        }
    }


    return (
        <productContext.Provider value={{
            products: state.products,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            detail: state.detail,
            cart: state.cart,
            cartLength: state.cartLength,
            favorites: state.favorites,
            favoritesLength: state.favoritesLength,
            userData: state.userData,
            getProducts,
            addProduct,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            getDetail,
            addProductInCart,
            getCartLength,
            getCart,
            changeProductCount,
            checkProductInCart,
            deleteFromCart,
            signUp,
            signIn,
            useAuth,
            logout,
            addProductInFavorites,
            getFavoritesLength,
            checkProductInFavorites,
            getFavorites,
            deleteFromFavorites,
            addUserData,
            getUserData,
            sendPasswordReset
        }}>
            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;