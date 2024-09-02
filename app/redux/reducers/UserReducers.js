import * as actions from '../Types'

const initialState = {
  favoriteProducts: [],
  cartProducts: []
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
    case actions.ADD_TO_CART:
      const { cartProductId }= action.payload;
      console.log('cartProductId in userReducer:', cartProductId)
      return {
        ...state,
        cartProducts: state.cartProducts.includes(cartProductId)
        ? state.cartProducts.filter(id => id !== cartProductId)
        : [...state.cartProducts, cartProductId]
      }
    default:
      return state
  }
}
