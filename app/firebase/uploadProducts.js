import firestore from '@react-native-firebase/firestore'

import { productList } from '../json';

export const uploadProductsToFireStore = async () => {
  const batch = firestore().batch();
  
  productList.forEach((product) => {

    const cleanProduct = Object.fromEntries(
      Object.entries(product).map(([key, value]) => [key, value === undefined ? null : value])
    );

    const productRef = firestore().collection('products').doc();
    batch.set(productRef, cleanProduct);
  });
  console.log('productList: ', productList)
  
  try {
    await batch.commit();
    console.log('Products uploaded to Firestore');
  }
  catch (error) {
    console.error('Error uploading products to Firestore:', error);
  }
}
