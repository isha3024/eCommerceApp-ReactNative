import * as actions from '../Types'

const initialState = {
  userInfo: null,
  isUserRegistered: false,
  isUserLoggedIn: false,
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.USER_REGISTER:
      return {
        ...state,
        isUserRegistered: true,
        isUserLoggedIn: true,
        userInfo: action.payload
      }
    case actions.USER_LOGIN:
      return {
        ...state,
        isUserRegistered: true,
        isUserLoggedIn: true,
        userInfo: action.payload
      }
    case actions.USER_LOGOUT: 
    return {
      ...state,
      isUserRegistered: true,
      isUserLoggedIn: false,
      userInfo: {}
    }
    default: 
    return state
  }
}