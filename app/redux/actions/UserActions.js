import * as actions from '../Types'

export const loadProducts = (data) => {
  const productsWithFavorite = data.map((product) => ({
    ...product,
    isFavorite: product.isFavorite || false, // Ensure isFavorite is set
  }));
  return {
    type: actions.LOAD_PRODUCTS,
    payload: productsWithFavorite
  }
}

export const toggleFavorite = (productId) => {
  return {
    type: actions.TOGGLE_FAVORITE,
    payload: productId
  }
}

export const addToCart = (productId) => {
  return {
    type: actions.ADD_TO_CART,
    payload: productId
  }
}