import * as actions from '../Types'

export const setUser = (user) => {
  return {
    type: actions.SET_USER,
    payload: user
  }
}

export const loginUser = (body) => {     
  return {
    type: actions.USER_LOGIN,
    payload: body
  }
}

export const clearUser = () => {
  return {
    type: actions.CLEAR_USER,
    payload: null
  }
}
