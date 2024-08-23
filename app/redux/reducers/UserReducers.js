import * as actions from '../Types'

const initialState = {
  favoriteProducts: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_FAVORITES:
      return {
        ...state,
        favoriteProducts: action.payload 
      };
    case actions.TOGGLE_FAVORITE:
      const { productId } = action.payload;
      return {
        ...state,
        favoriteProducts: state.favoriteProducts.includes(productId)
        ? state.favoriteProducts.filter(id => id !== productId)
        : [...state.favoriteProducts, productId]
      }
    case actions.CLEAR_FAVORITES:
      return {
        ...state,
        favoriteProducts: []
      }
    default:
      return state
  }
}
