import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import * as actions from '../Types'

export const registerUser = (data) => {
  AsyncStorage.setItem('user', JSON.stringify(data))
  return {
    type: actions.USER_REGISTER,
    payload: data
  }
}

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if(userData !== null) {
        const parsedData = JSON.parse(userData);
        if (parsedData.email === data.email && parsedData.password === data.password){
          dispatch({
            type: actions.USER_LOGIN,
            payload: parsedData
          })
        }else {
          ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT)
        }
      }else {
        ToastAndroid.show('No user found! Please register first', ToastAndroid.SHORT)
      }
    }
    catch (error) {
      console.log('Error loggin in',error);
    }
  }
}

export const logoutUser = () => {
  return {
    type: actions.USER_LOGOUT,
  }
}