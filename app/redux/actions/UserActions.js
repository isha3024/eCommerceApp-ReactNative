import * as actions from '../Types'
import * as data from '../../json'


const products = data.productList

export const loadProducts = () => {
  return async (dispatch) => {
    dispatch({ type: actions.LOAD_PRODUCTS });
    try {
      const response = await products;
      dispatch({type: actions.LOAD_PRODUCTS_SUCCESS, payload: response})
      return response;
    }
    catch (error) {
      dispatch({type: actions.LOAD_PRODUCTS_FAILURE, payload: error})
      console.log('error:: ', error);
      throw error
    }
  }
}
