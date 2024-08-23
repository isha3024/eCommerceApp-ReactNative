import * as actions from '../Types'

const initialState = {
  userInfo: null,
  isUserLoggedIn: false
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        userInfo: action.payload,
        isUserLoggedIn: true
      }
    case actions.CLEAR_USER: 
    return {
      ...state,
      userInfo: null,
      isUserLoggedIn: false
    }
    default: 
    return state
  }
}