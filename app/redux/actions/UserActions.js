import * as actions from '../Types'


export const toggleFavorite = (productId) => {
  return {
    type: actions.TOGGLE_FAVORITE,
    payload: {productId}
  }
}

export const updateFavorites = (favorites) => {
  return {
    type: actions.UPDATE_FAVORITES,
    payload: favorites
  }
}

export const clearFavorites = () => {
  return {
    type: actions.CLEAR_FAVORITES,
    payload: null
  }
}

  export const addToCart = (productId) => {
    return {
      type: actions.ADD_TO_CART,
      payload: productId
    }
  }