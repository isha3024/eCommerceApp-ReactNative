import firestore from '@react-native-firebase/firestore'


export const uploadNewUserToFireStore = async (user) => {
  const batch = firestore().batch();

  const userRef = firestore().collection('user').doc();
  batch.set(userRef, user);

  try {
    await batch.commit();
    console.log('userInfo after commit')
  }
  catch (error) {
    console.log('Error: ', error)
  }
}