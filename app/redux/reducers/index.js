import { configureStore } from '@reduxjs/toolkit';
import { PracticeReducer } from './PracticeReducer';
import { thunk } from 'redux-thunk';
import { AuthReducer } from './AuthReducer';

let store = configureStore({
  reducer: {
    practice: PracticeReducer,
    auth: AuthReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store