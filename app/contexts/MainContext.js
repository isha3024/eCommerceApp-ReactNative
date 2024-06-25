import React, {createContext, useContext, useMemo, useState} from 'react';
const context = createContext();

export const MainContextProvider = props => {
  const [screenState, setScreenState] = useState('number');
  // console.log('🚀 ~ MainContextProvider ~ screenState:', screenState);
  const [validateNumber, setValidateNumber] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  console.log('🚀 ~ MainContextProvider ~ mobileNumber:', mobileNumber);
  const [userName, setUserName] = useState('');
  console.log('🚀 ~ MainContextProvider ~ userName:', userName);
  // console.log('🚀 ~ MainContextProvider ~ mobileNumber:', mobileNumber);
  const [name, setName] = useState([]);
  const [otp, setOtp] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  console.log('🚀 ~ MainContextProvider ~ isRegistered:', isRegistered);
  const [id, setId] = useState([]);

  const value = useMemo(() => {
    return {
      screenState: screenState,
      setScreenState: setScreenState,
      validateNumber: validateNumber,
      setValidateNumber: setValidateNumber,
      mobileNumber: mobileNumber,
      setMobileNumber: setMobileNumber,
      userName: userName,
      setUserName: setUserName,
      otp: otp,
      setOtp: setOtp,
      name: name,
      setName: setName,
      playerId: playerId,
      setPlayerId: setPlayerId,
      id: id,
      setId: setId,
      isRegistered: isRegistered,
      setIsRegistered: setIsRegistered,
    };
  }, [
    screenState,
    validateNumber,
    isRegistered,
    setIsRegistered,
    setValidateNumber,
    setScreenState,
    mobileNumber,
    setMobileNumber,
    userName,
    setUserName,
    otp,
    setOtp,
    setName,
    name,
    setPlayerId,
    playerId,
    id,
    setId,
  ]);

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
