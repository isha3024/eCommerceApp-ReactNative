import * as actions from '../Types'

const initialState = {
  products: [],
}

export const productReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actions.LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    default:
      return state
  }
}