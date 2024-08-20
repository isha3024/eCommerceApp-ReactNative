import firestore from '@react-native-firebase/firestore'
import { productList } from '../json';

export const uploadProductsToFireStore = async () => {
  const batch = firestore().batch();

  productList.forEach((product) => {
    const productRef = firestore().collection('products').doc();
    batch.set(productRef, product);
  });
  
  try {
    await batch.commit();
    console.log('Products uploaded to Firestore');
  }
  catch (error) {
    console.error('Error uploading products to Firestore:', error);
  }
}
