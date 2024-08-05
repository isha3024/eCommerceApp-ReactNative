import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './AuthReducer';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REHYDRATE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { productReducer } from './UserReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  authUser: authReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

console.log('store: ', store.getState())

export const persistor = persistStore(store);
