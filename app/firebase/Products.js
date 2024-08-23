import firestore from '@react-native-firebase/firestore'

export const uploadProductsToFireStore = async (products) => {
  const batch = firestore().batch();
  
  products.forEach((product) => {
    const cleanProduct = Object.fromEntries(
      Object.entries(product).map(([key, value]) => [key, value === undefined ? null : value])
    );

    const productRef = firestore().collection('products').doc();
    batch.set(productRef, cleanProduct);
  });
  console.log('productList: ', products)
  
  try {
    await batch.commit();
    console.log('Products uploaded to Firestore');
  }
  catch (error) {
    console.error('Error uploading products to Firestore:', error);
  }
}