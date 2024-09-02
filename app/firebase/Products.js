import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app';
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

export const addQuantityFieldToProducts = async () => {
  try {
    
    const productsRef = firebase.firestore().collection('products')
    const snapshot = await productsRef.get();
    // console.log('snapshot:: ', snapshot.docs.forEach(data => console.log(data.data())))
    const batch = firebase.firestore().batch();
    snapshot.forEach((doc) => {
      console.log('doc: ', doc.data())
      const productRef = productsRef.doc(doc.id);
      batch.update(productRef, { productQuantity: 1 });
    });
    
    await batch.commit();
    console.log('Quantity field added to all products successfully!');
  } catch (error) {
    console.error('Error adding quantity field: ', error);
  }
};