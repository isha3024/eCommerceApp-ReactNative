import * as actions from '../Types'

const initialState = {
  productsLoading: false,
  products: [],
}

export const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.LOAD_PRODUCTS:
      return { 
        ...state, 
        productsLoading: true, 
      }
    case actions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload
      }
    case actions.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        productsLoading: false,
      }
    default:
      return state
  }
}