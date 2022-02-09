import React, { createContext, useEffect, useReducer, useState } from 'react';
import { db, auth } from '../firebase-config';
import { addDoc, collection, doc, getDocs, updateDoc, getDoc, deleteDoc, query, orderBy, startAfter, limit, startAt } from 'firebase/firestore'
import { calcSubPrice, calcTotalPrice, getProductsInCart } from '../Helpers/CalcPrice';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';



export const productContext = createContext()

const INIT_STATE = { 
    products: [],
    edit: [],
    paginatedPages: {},
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
                ...state, products: action.payload,
                // paginatedPages: Math.ceil(action.payload ['x-total-count'] / 3)
            }
        case 'GET_PRODUCT_TO_EDIT':
            return {
                ...state, edit: action.payload
            }
        // case 'PAGINATION':
        //     return {
        //         ...state, paginatedPages: action.payload
        //     }
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
    const productsCollectionRef = collection(db, "products")
    const q = query(productsCollectionRef, orderBy('createdAt'), limit(2))
    // console.log('this is q:', q);

    //todo CREATE
    const addProduct = async (newProduct) => {
        try {
            let res = await addDoc(productsCollectionRef, newProduct)
            getProducts()
            return res
        } catch (error) {
            console.log(error);
        }
    }

    //todo READ
    const getProducts = async () => {
        try {
            // const qq = query(productsCollectionRef, orderBy('name'), limit(10))
            // console.log('get', qq);
            const data = await getDocs(productsCollectionRef)
            console.log(data.docs);
            let res = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))
            // console.log('res:', res);
            // const q = query(res, orderBy('name'), limit(2))
            let action = {
                type: 'GET_PRODUCTS',
                payload: res
            }
            dispatch(action)

            // console.log(action);
        } catch (error) {
            console.log('GET_PRODUCTS_ERR', error);
        }
    }

    //todo UPDATE
    const editProduct = async (id) => {
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);

            let action = {
                type: 'GET_PRODUCT_TO_EDIT',
                payload: docSnap.data()
            }
            dispatch(action)
        } catch (error) {
            console.log('EDIT_PRODUCT_ERR', error);
        }
    }

    //todo Save edited product
    const saveEditedProduct = async (id, updatedProduct) => {
        try {
            const docRef = doc(db, "products", id);

            // const productDoc = doc(db, "products", id)
            // const newFileds = {price: price + 1}
            console.log(updatedProduct);
            let res = await updateDoc(docRef, updatedProduct)
            getProducts()
        } catch (error) {
            console.log('SAVE_PRODUCT_ERR', error);
        }
    }

    // console.log(state, 'state');
    // console.log(state.products, 'products');
    // console.log(state.edit, 'edit');



    //todo DELETE
    const deleteProduct = async (id) => {
        try {
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef)
            getProducts()
           
        } catch (error) {
            console.log(error);
        }
    }

        // const field = 'name';
        // const pageSize = 2;

        // const q = query(productsCollectionRef, orderBy(field), limit(pageSize));
        // console.log(q);

        // function nextPage(last) {
        //     return productsCollectionRef.orderBy(field)
        //               .startAfter(last[field])
        //               .limit(pageSize);
        // }

        // function prevPage(first) {
        //     return productsCollectionRef.orderBy(field)
        //               .startAfter(first[field])
        //               .limitToLast(pageSize);
        // }

    // //todo pagination 
  
    // const pagination = async () => {
    //     const q = query(productsCollectionRef, orderBy("createdAt"), limit(2));
    //     console.log(q);
    //     let action = {
    //         type: 'PAGINATION',
    //         payload: q
    //     }
    //     dispatch(action)
    //     getProducts()
    //     console.log('q', action.payload);
    // }

    // console.log('page', state.paginatedPages);

      //! get detail
      const getDetail = async (id) => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        let action = {
            type: 'GET_PRODUCT_DETAIL',
            payload: docSnap.data()
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
        console.log(items);
        for (let i =0; i< items.products.length; i++) { 
            let targetItem = items.products[i].item.id
            let targetItemPrice = items.products[i].item.price  
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

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
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
          let targetItem = items.products[i].item.id;            
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
            // paginatedPages: state.paginatedPages,
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
            getUserData
        }}>
            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;