import * as actions from '../Types';

const initialState = {
  userData: {},
  isLoggedIn: false
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      };
    case actions.USER_LOGOUT:
      return initialState;
    default:
      return state
  }
};
