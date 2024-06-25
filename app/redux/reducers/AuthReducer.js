import * as actions from '../Types';

const initialState = {
  userLoginResponse: null,
  isUserLogin: false,
};

export const AuthReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        userLoginResponse: payload.userLoginResponse,
        isUserLogin: payload.isUserLogin,
        ...payload,
      };
    case actions.SET_USER_LOGGED_IN:
      return {
        ...state,
        ...payload,
      };
    case actions.SET_USER_LOGGED_OUT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
