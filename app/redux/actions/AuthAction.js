import AsyncStorage from '@react-native-async-storage/async-storage'
import * as actions from '../Types'


export const registerUser = (data) => {
  console.log('userData: ', data)
  AsyncStorage.setItem('user', JSON.stringify(data))
  return {
    type: actions.USER_REGISTER,
    payload: data
  }
}

export const logoutUser = () => {
  return {
    type: actions.USER_LOGOUT,
  }
}