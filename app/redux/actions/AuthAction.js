import * as actions from '../Types'

export const registerUser = (body) => {
  return {
    type: actions.USER_REGISTER,
    payload: body
  }
}

export const loginUser = (body) => {     
  return {
    type: actions.USER_LOGIN,
    payload: body
  }
}

export const logoutUser = () => {
  return {
    type: actions.USER_LOGOUT,
    payload: null
  }
}
