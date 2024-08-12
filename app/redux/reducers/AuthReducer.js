import * as actions from '../Types'

const initialState = {
  userInfo: null,
  isUserRegistered: false
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.USER_REGISTER:
      case actions.USER_LOGIN:
      return {
        ...state,
        isUserRegistered: true,
        userInfo: action.payload
      }
    case actions.USER_LOGOUT: 
    return {
      ...state,
      isUserRegistered: false,
      userInfo: {}
    }
    default: 
    return state
  }
}