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
    case actions.ADD_TO_CART:
      const cartProducts = state.products.map((product) =>{
        if(product.id === action.payload){
          return {...product, productQuantity: product.productQuantity + 1}
        }
        return product
      })
      return {
        ...state,
        products: cartProducts
      }
    default:
      return state
  }
}
