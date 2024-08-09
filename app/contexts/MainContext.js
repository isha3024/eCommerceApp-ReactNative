import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

import * as data from '../json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const context = createContext();
const initialProducts = data.productList;

export const MainContextProvider = props => {

  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0)
  const [paymentCardDetails, setPaymentCardDetails] = useState([]);
  const [paymentCardSelected, setPaymentCardSelected] = useState({});
  const [paymentCardSelectedIndex, setPaymentCardSelectedIndex] = useState(0)
  const [cartProductList, setCartProductList] = useState([]);
  const [orders, setOrders] = useState([]);

  const saveProducts = async (products) => {
    setLoading(true)
    try {
      await AsyncStorage.setItem('productList', JSON.stringify(products));
    }
    catch (error) {
      console.error('Failed to store the products ', error);
    }
    setLoading(false)
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const storedProducts = await AsyncStorage.getItem('productList');
      if(storedProducts){
        setAllProducts(JSON.parse(storedProducts));
      }
    }
    catch (error) {
      console.error('Failed to load products from storage ',error);
    }
    setLoading(false)
  } 

  const saveCartProductList = async (list) => {
    setLoading(true)
    try {
      await AsyncStorage.setItem('cartList', JSON.stringify(list));
    } catch (error) {
      console.error('Failed to store the cart product list ', error);
    }
    setLoading(false)
  };

  const loadCartListItemsFromStorage = async () => {
    setLoading(true);
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
    setLoading(false);
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
    setLoading(true)
    try {
      const response = await AsyncStorage.getItem('addresses');
      if(response !== null) {
        setAddresses(JSON.parse(response))
        setSelectedAddress(JSON.parse(response)[selectedAddressIndex])
        setLoading(false)
      }
    }
    catch (error) {
      console.log('Failed to fetch addresses',error)
      setLoading(false)
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
    setLoading(true)
    try {
      const response = await AsyncStorage.getItem('paymentCardDetails');
      if(response !== null) {
        setPaymentCardDetails(JSON.parse(response))
        setPaymentCardSelected(JSON.parse(response)[paymentCardSelectedIndex])
        setLoading(false)
      }
    }
    catch (error) {
      console.log('Failed to fetch payment card details',error)
      setLoading(false)
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
    setLoading(true)
    try {
      const response = await AsyncStorage.getItem('orders');
      if(response !== null) {
        setOrders(JSON.parse(response))
        setLoading(false)
      }
    }
    catch (error) {
      console.log('Failed to fetched orders.', error)
    }
  }

  const value = useMemo(() => {
    return {
      loading: loading,
      setLoading: setLoading,
      allProducts: allProducts,
      setAllProducts: setAllProducts,
      addresses: addresses,
      setAddresses: setAddresses,
      saveAddress: saveAddress,
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
      saveProducts: saveProducts,
      saveCartProductList: saveCartProductList,
      orders: orders,
      setOrders: setOrders,
      saveOrders: saveOrders,
      getOrdersFromStorage: getOrdersFromStorage,
    }
  }, [
    loading,
    setLoading,
    allProducts,
    setAllProducts,
    addresses,
    setAddresses,
    saveAddress,
    getAddressesFromStorage,
    selectedAddress,
    setSelectedAddress,
    selectedAddressIndex,
    setSelectedAddressIndex,
    paymentCardDetails,
    setPaymentCardDetails,
    savePaymentCard,
    getPaymentCardFromStorage,
    paymentCardSelectedIndex,
    setPaymentCardSelectedIndex,
    paymentCardSelected,
    setPaymentCardSelected,
    cartProductList,  
    setCartProductList,
    orders,
    setOrders,
    saveOrders,
    getOrdersFromStorage
  ]);

  useEffect(() => {
    saveProducts(allProducts)
  },[allProducts])

  useEffect(() => {
    fetchProducts();
  },[])

  useEffect(() => {
    loadCartListItemsFromStorage();
  }, []);

  useEffect(() => {
    if (cartProductList.length > 0) {
      saveCartProductList(cartProductList);
    }
  }, [cartProductList]);

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
