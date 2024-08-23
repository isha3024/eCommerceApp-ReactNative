import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/auth';

import { LocalizationProvider } from './contexts';
import { MainContextProvider } from './contexts/MainContext';
import { MainStackNavigation } from './navigation';
import { color, fonts, size } from './theme';
import { persistor, store } from './redux';
import { uploadNewUserToFireStore } from './firebase';



const App = () => {

  LogBox.ignoreLogs([
    'Tried to modify key `reduceMotion` of an object which has been already passed to a worklet'
  ]);

  useEffect(() => {
    if(!firebase.apps.length) {
      firebase.initializeApp()
    }
  },[])

  useEffect(() => {
    if(!firebase.apps.length) {
      firebase.initializeApp()
    }
  },[])

  return (
    <MainContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
              <LocalizationProvider>
                {/* <Text>App</Text> */}
                <MainStackNavigation />
                {/* <DemoScreen /> */}
              </LocalizationProvider>
            </SafeAreaView>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </MainContextProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseToast: {
    borderColor: color.primary,
    borderWidth: 1,
    width: size.deviceWidth * 0.9,
    borderRadius: size.moderateScale(5),
    borderLeftWidth: 1,
    height: size.moderateScale(60),
    backgroundColor: color.green,
  },
  baseToastView: {
    // borderWidth: 1,
    height: 40,
    width: 40,
    paddingTop: 5,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingVertical: size.moderateScale(10),
    paddingLeft: 10,
    // backgroundColor: color.red,
  },
  baseToastTextStyle1: {
    fontSize: size.moderateScale(17),
    fontFamily: fonts.poppinsMedium,
    fontWeight: '600',
    color: color.white,
    textAlign: 'center',
    top: size.moderateScale(4),
    right: size.moderateScale(15),
  },
  baseToastTextStyle2: {
    fontSize: size.moderateScale(17),
    fontFamily: fonts.poppinsRegular,
    fontWeight: '400',
    color: color.customBlack(0.5),
    top: -1,
  },
  errorMessage: {
    borderColor: color.primary,
    // borderWidth: 1,
    width: size.deviceWidth * 0.9,
    borderRadius: size.moderateScale(5),
    borderLeftWidth: 1,
    height: size.moderateScale(50),
    backgroundColor: color.red,
    justifyContent: 'center',
  },
  errorMessageView: {
    // borderWidth: 1,
    height: 50,
    width: 50,
    // paddingTop: 10,
    // paddingLeft: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: color.red,
  },
  contentContainerStyle2: {
    // paddingVertical: size.moderateScale(10),
    paddingBottom: size.moderateScale(10),
    paddingTop: size.moderateScale(10),
    overflow: 'hidden',
    // paddingLeft: 10,
    // backgroundColor: color.red,

    // justifyContent: 'center',
  },
  errorMessageOne: {
    fontSize: size.moderateScale(15),
    fontFamily: fonts.poppinsMedium,
    fontWeight: '600',
    color: color.white,
    top: size.moderateScale(3),
    textAlign: 'center',
    right: size.moderateScale(25),
  },
  errorMessageTwo: {
    fontSize: size.moderateScale(13),
    fontFamily: fonts.poppinsRegular,
    fontWeight: '400',
    color: color.white,
    top: 0,
  },
  tomatoToastView: {
    height: size.moderateScale(60),
    width: '100%',
    backgroundColor: color.red,
  },
});

export default App;
