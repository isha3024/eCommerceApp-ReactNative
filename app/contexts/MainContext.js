import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

import * as data from '../json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const context = createContext();
const initialProducts = data.productList;

export const MainContextProvider = props => {

  
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('')
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0)
  const [paymentCardDetails, setPaymentCardDetails] = useState([]);
  const [paymentCardSelected, setPaymentCardSelected] = useState({});
  const [paymentCardSelectedIndex, setPaymentCardSelectedIndex] = useState(0)
  const [cartProductList, setCartProductList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    colors: [],
    size: [],
    category: [],
    priceRange: [0, 500],
    brands: []
  });

  const saveProducts = async (products) => {

    try {
      await AsyncStorage.setItem('productList', JSON.stringify(products));
      setAllProducts(products)
    }
    catch (error) {
      console.error('Failed to store the products ', error);
    }

  }

  const fetchProducts = async () => {

    try {
      const storedProducts = await AsyncStorage.getItem('productList');
      if(storedProducts){
        setAllProducts(JSON.parse(storedProducts));
      }
    }
    catch (error) {
      console.error('Failed to load products from storage ',error);
    }

  } 

  const saveFavoriteProducts = async (products) => {

    try {
      await AsyncStorage.setItem('favoriteProducts', JSON.stringify(products));
    }
    catch (error) {
      console.error('Failed to store the favorite products ', error);
    }

  }

  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }))
  }

  const resetFilters = () => {
    setFilters({
      colors: [],
      size: [],
      category: [],
      priceRange: [0, 500],
      brands: []
    })
  }

  const loadFavoriteProductsFromStorage = async () => {

    try {
      const response = await AsyncStorage.getItem('favoriteProducts');
      if(response){
        return JSON.parse(response)
      }
    }
    catch (error) {
      console.error('Failed to load favorite products from storage ', error);
    }

  }

  const saveCartProductList = async (list) => {

    try {
      await AsyncStorage.setItem('cartList', JSON.stringify(list));
    } catch (error) {
      console.error('Failed to store the cart product list ', error);
    }

  };

  const loadCartListItemsFromStorage = async () => {

    try {
      const response = await AsyncStorage.getItem('cartList');
      if(response) {
        const responseInJSON = JSON.parse(response);
        setCartProductList(responseInJSON)
      }
    }
    catch (error) {
      console.error('Failed to load cart list items from storage ', error);
    }

  }

  const saveAddress = async (addresses) => {
    try {
      await AsyncStorage.setItem('addresses',JSON.stringify(addresses))
    }
    catch (error) {
      console.log('Failed to store the addresses', error)
    }
  }

  const getAddressesFromStorage = async () => {

    try {
      const response = await AsyncStorage.getItem('addresses');
      if(response !== null) {
        setAddresses(JSON.parse(response))
        setSelectedAddress(JSON.parse(response)[selectedAddressIndex])
    
      }
    }
    catch (error) {
      console.log('Failed to fetch addresses',error)
  
    }
  }

  const savePaymentCard = async (paymentCardDetails) => {
    try {
      await AsyncStorage.setItem('paymentCardDetails',JSON.stringify(paymentCardDetails))
    }
    catch (error) {
      console.log('Failed to store the payment card details', error)
    }
  }

  const getPaymentCardFromStorage = async () => {

    try {
      const response = await AsyncStorage.getItem('paymentCardDetails');
      if(response !== null) {
        setPaymentCardDetails(JSON.parse(response))
        setPaymentCardSelected(JSON.parse(response)[paymentCardSelectedIndex])
    
      }
    }
    catch (error) {
      console.log('Failed to fetch payment card details',error)
  
    }
  }

  const saveOrders = async (newOrders) => {
    if (newOrders && Array.isArray(newOrders)) {
      try {
        await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
      } catch (error) {
        console.log('Failed to save orders', error);
      }
    } else {
      console.error('saveOrders received an invalid orders array', newOrders);
    }
  };

  const getOrdersFromStorage = async () => {

    try {
      const response = await AsyncStorage.getItem('orders');
      if(response !== null) {
        setOrders(JSON.parse(response));
    
      }
    }
    catch (error) {
      console.log('Failed to fetched orders.', error)
    }
  }

  const value = useMemo(() => {
    return {
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      loading: loading,
      userId: userId,
      setUserId: setUserId,
      setLoading: setLoading,
      allProducts: allProducts,
      setAllProducts: setAllProducts,
      favoriteProductIds: favoriteProductIds,
      setFavoriteProductIds: setFavoriteProductIds,
      saveProducts: saveProducts,
      saveFavoriteProducts: saveFavoriteProducts,
      loadFavoriteProductsFromStorage: loadFavoriteProductsFromStorage,
      updateFilters: updateFilters,
      resetFilters: resetFilters,
      addresses: addresses,
      setAddresses: setAddresses,
      getAddressesFromStorage: getAddressesFromStorage,
      selectedAddress: selectedAddress,
      selectedAddressIndex: selectedAddressIndex,
      setSelectedAddressIndex: setSelectedAddressIndex,
      setSelectedAddress: setSelectedAddress,
      paymentCardDetails: paymentCardDetails,
      setPaymentCardDetails: setPaymentCardDetails,
      savePaymentCard: savePaymentCard,
      getPaymentCardFromStorage: getPaymentCardFromStorage,
      paymentCardSelected: paymentCardSelected,
      setPaymentCardSelected: setPaymentCardSelected,
      paymentCardSelectedIndex: paymentCardSelectedIndex,
      setPaymentCardSelectedIndex: setPaymentCardSelectedIndex,
      cartProductList: cartProductList,
      setCartProductList: setCartProductList,
      saveCartProductList: saveCartProductList,
      orders: orders,
      setOrders: setOrders,
      saveOrders: saveOrders,
      getOrdersFromStorage: getOrdersFromStorage,
      filter: filters,
      setFilters: setFilters
    }
  }, [
    currentUser, setCurrentUser,
    loading, setLoading,
    userId, setUserId,
    allProducts, setAllProducts,
    favoriteProductIds, setFavoriteProductIds,
    saveProducts, fetchProducts,
    addresses, setAddresses,
    saveAddress, getAddressesFromStorage,
    saveFavoriteProducts, loadFavoriteProductsFromStorage,
    updateFilters, resetFilters,
    selectedAddress, setSelectedAddress,
    selectedAddressIndex, setSelectedAddressIndex,
    paymentCardDetails, setPaymentCardDetails,
    savePaymentCard, getPaymentCardFromStorage,
    paymentCardSelectedIndex, setPaymentCardSelectedIndex,
    paymentCardSelected, setPaymentCardSelected,
    cartProductList, setCartProductList,
    orders, setOrders,
    saveOrders, getOrdersFromStorage,
    filters , setFilters
  ]);


  useEffect(() => {
    if (cartProductList.length > 0) {
      saveCartProductList(cartProductList);
    }
  }, [cartProductList]);

  useEffect(() => {
    loadCartListItemsFromStorage();
  }, []);

  useEffect(() => {
    if(addresses.length > 0) {
      saveAddress(addresses)
    }
  },[addresses])

  useEffect(() => {
    getAddressesFromStorage()
  },[])

  useEffect(() => {
    if(paymentCardDetails.length > 0) {
      savePaymentCard(paymentCardDetails)
    }
  },[paymentCardDetails])

  useEffect(() => {
    getPaymentCardFromStorage()
  },[])

  useEffect(() => {
    if(orders.length > 0) {
      saveOrders(orders)
    }
  },[orders])

  useEffect(() => {
    getOrdersFromStorage()
  },[])

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
