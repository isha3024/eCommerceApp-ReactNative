import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';

import { authReducer } from './AuthReducer';
import { productReducer } from './UserReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['authUser', 'favorites']
};

const rootReducer = combineReducers({
  authUser: authReducer,
  favorites: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk),
});

export const persistor = persistStore(store);
