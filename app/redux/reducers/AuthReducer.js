import * as actions from '../Types';

const initialState = {
  userData: {},
  isLoggedIn: false
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case actions.USER_LOGOUT:
      return initialState;
    default: 
      return state
  }
};
