import Toast from "react-native-toast-message";
import { _userAdd, _userLogin } from "../../services"
import * as actions from '../Types';


export const userAdd = (body) => {
  // console.log('in AuthAction file')
  return _userAdd(body)
  .then(response => {
    console.log('response: ', response)
    Toast.show({
      type: 'success',
      text1: response,
    });
    return response;
  })
  .catch(error => {
    console.log('response: ', response)
    Toast.show({
      type: 'error',
      text1: error,
    });
    throw error;
  })
}

export const userLogin = (body) => {
  // console.log('in AuthAction file')
  return async (dispatch) => {
    return _userLogin(body)
    .then(response => {
      console.log('response: ', response)
      Toast.show({
        type: 'success',
        text1: response,
      });
      if(response.statusCode === 201){
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: response.data })
      }
      return response;
    })
    .catch(error => {
      console.log('error: ', error)
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      throw error;
    });
  }
}
