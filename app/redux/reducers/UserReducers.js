import * as actions from '../Types'

const initialState = {
  products: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
      
      case actions.TOGGLE_FAVORITE:
        const updatedProducts = state.products.map((product) =>
          product.id === action.payload
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        );
        return {
          ...state,
          products: updatedProducts,
        };

    default:
      return state
  }
}
