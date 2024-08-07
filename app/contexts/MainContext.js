import React, {createContext, useContext, useMemo, useState} from 'react';
const context = createContext();

export const MainContextProvider = props => {


  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [paymentCardDetails, setPaymentCardDetails] = useState([]);
  const [paymentCardSelected, setPaymentCardSelected] = useState({});
  const [cartProductList, setCartProductList] = useState([]);

  console.log('paymentCardDetails: ', paymentCardDetails)
  console.log('paymentCardSelected: ', paymentCardSelected)

  const value = useMemo(() => {
    return {
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

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
