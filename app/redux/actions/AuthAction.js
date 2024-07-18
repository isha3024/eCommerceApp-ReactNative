import Toast from "react-native-toast-message";
import { _userAdd, _userLogin } from "../../services"

export const userAdd = (body) => {
  console.log('in AuthAction file')
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
      console.log('error: ', error)
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      throw error;
    });
}

export const userLogin = (body) => {
  // console.log('in AuthAction file')
  return _userLogin(body)
    .then(response => {
      console.log('response: ', response)
      Toast.show({
        type: 'success',
        text1: response,
      });
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