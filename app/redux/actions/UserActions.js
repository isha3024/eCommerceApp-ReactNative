import * as actions from '../Types'
import * as data from '../../json'


const products = data.productList

export const loadProducts = () => {
  return {
    type: actions.LOAD_PRODUCTS,
    payload: products
  }
}

// export const addToFavorite = (item) => {
//   return {
//     type: actions.ADD_TO_FAVORITE,
//     payload: item
//   }
// }

