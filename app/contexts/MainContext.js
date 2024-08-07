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
  const [paymentCardDetails, setPaymentCardDetails] = useState([]);
  const [paymentCardSelected, setPaymentCardSelected] = useState({});
  const [cartProductList, setCartProductList] = useState([]);

  console.log('allproducts in main context: ',allProducts)

  const saveProducts = async () => {
    try {
      await AsyncStorage.setItem('productList', JSON.stringify(allProducts));
    }
    catch (error) {
      console.error('Failed to store the products ', error);
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const storedProducts = await AsyncStorage.getItem('productList');
      if(storedProducts){
        setAllProducts(JSON.parse(storedProducts));
        setLoading(false)
      }
    }
    catch (error) {
      console.error('Failed to load products from storage ',error);
      setLoading(false)
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
      selectedAddress: selectedAddress,
      setSelectedAddress: setSelectedAddress,
      paymentCardDetails: paymentCardDetails,
      setPaymentCardDetails: setPaymentCardDetails,
      paymentCardSelected: paymentCardSelected,
      setPaymentCardSelected: setPaymentCardSelected,
      cartProductList: cartProductList,
      setCartProductList: setCartProductList,
    }
  }, [
    loading,
    setLoading,
    allProducts,
    setAllProducts,
    addresses,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    paymentCardDetails,
    setPaymentCardDetails,
    paymentCardSelected,
    setPaymentCardSelected,
    cartProductList,  
    setCartProductList
  ]);

  useEffect(() => {
    saveProducts()
  },[allProducts])

  useEffect(() => {
    fetchProducts();
  },[])

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
