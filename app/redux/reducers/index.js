import { configureStore } from '@reduxjs/toolkit';
import { PracticeReducer } from './PracticeReducer';
import { thunk } from 'redux-thunk';


let store = configureStore({
  reducer: {
    practice: PracticeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store