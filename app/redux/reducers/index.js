// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {configureStore} from '@reduxjs/toolkit';
// import {combineReducers} from 'redux';
// import {persistReducer, persistStore} from 'redux-persist';
// import {thunk} from 'redux-thunk';

import {AuthReducer} from './AuthReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  authReducer: AuthReducer,
});

const rootReducer = (state, action) => {
  // INFO: clear all data in redux store to initial.
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
let persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({
  reducer: persistedReducer,
  devTools: true, // NOTE: only for development environment
  middleware: () => {
    // WARNING: this means that _none_ of the default middleware are added!
    return [thunk];
    // or for TS users, use:
    // return new Tuple(myMiddleware)
  },
});

let persistor = persistStore(store);

export {persistor, store};
