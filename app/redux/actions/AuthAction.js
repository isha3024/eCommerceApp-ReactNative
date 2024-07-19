import Toast from "react-native-toast-message";
import { _userAdd, _userLogin } from "../../services"
import * as actions from '../Types';


export const userAdd = (body) => {
  // console.log('in AuthAction file')
  return _userAdd(body)
  .then(response => {
    console.log('response: ', response)
    return response;
  })
  .catch(error => {
    console.log('error: ', error)
    throw error;
  })
}

export const userLogin = (body) => {
  // console.log('in AuthAction file')
  return _userLogin(body)
  .then(response => {
    console.log('response: ', response)
    return response;
  })
  .catch(error => {
    console.log('error: ', error)
    throw error;
  })
}
