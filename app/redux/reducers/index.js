import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { authReducer } from './AuthReducer';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REHYDRATE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  authUser: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)