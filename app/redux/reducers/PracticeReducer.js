// import * as actions from '../Types'
import { ADD_TO_CART } from "../Types";

const initialState = [];

export const PracticeReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}