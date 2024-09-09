import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { OneSignal } from 'react-native-onesignal';
import NetInfo from "@react-native-community/netinfo";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddNewAddressScreen, AddressScreen, BrandScreen, CameraScreen, CaptureImageScreen, CheckoutScreen, DemoScreen, FilterScreen, ImagesScreen, MainProductScreen, NoNetworkScreen, PaymentMethodScreen, RatingsReviewsScreen, SettingsScreen, SplashScreen, SuccessScreen } from '../../screens';
import { AuthStackNavigation } from '../authStackNavigation';
import { BottomStackNavigation } from '../bottomStackNavigation';
import axios from 'axios';
import { useNotificationContext } from '../../contexts/OneSignalContext';
import { sendNotification } from '../../utils/functions';

const Stack = createNativeStackNavigator();


export const MainStackNavigation = () => {

  const isUserLoggedIn = useSelector(state => state.authUser.isUserLoggedIn);
  // console.log('isUserLoggedIn: ', isUserLoggedIn)

  const [showSplashScreen, setHideSplashScreen] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const { isPermissionGranted } = useNotificationContext();

  const openNotificationSetting = () => {
    if(Platform.OS === 'android') {
      Linking.openSettings();
    }
  }

  useEffect(() => {
    if(!isPermissionGranted) {
      Alert.alert(
        'Enable Notifications',
        'This app needs notifications to keep you informed. Please enable notifications in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {text: 'OK', onPress: () => openNotificationSetting()}
        ]
      )
    }else {
      // Only send notification if permission is granted
      OneSignal.User.pushSubscription.getIdAsync().then((subscriptionId) => {
        if (subscriptionId) {
          sendNotification(subscriptionId);
        }
      });
    }
  },[isPermissionGranted])


  useEffect(() => {
    const unsuscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
      if(!state.isConnected) {
        ToastAndroid.show('No Internet Connection', ToastAndroid.SHORT)
      }
    })

    return () => unsuscribe()
  }, [isConnected])

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplashScreen ? (
          <Stack.Screen
            name="splashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : null}
        {!isConnected && (
          <Stack.Screen
            name='noNetworkScreen'
            component={NoNetworkScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        {
          isConnected && (
            <>
              {
                isUserLoggedIn
                  ? (
                    <Stack.Screen
                      name="bottomStackNavigation"
                      component={BottomStackNavigation}
                      options={{
                        headerShown: false,
                      }}
                    />
                  )
                  : (
                    <Stack.Screen
                      name="authStackNavigation"
                      component={AuthStackNavigation}
                      options={{
                        headerShown: false,
                      }}
                    />
                  )
              }
              <Stack.Screen
                name="cameraScreen"
                component={CameraScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="captureImageScreen"
                component={CaptureImageScreen}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name="imagesScreen"
                component={ImagesScreen}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name="filterScreen"
                component={FilterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="brandScreen"
                component={BrandScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="mainProductScreen"
                component={MainProductScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ratingsReviewsScreen"
                component={RatingsReviewsScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="settingsScreen"
                component={SettingsScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="paymentMethodScreen"
                component={PaymentMethodScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="addressScreen"
                component={AddressScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="addNewAddressScreen"
                component={AddNewAddressScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="checkoutScreen"
                component={CheckoutScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="successScreen"
                component={SuccessScreen}
                options={{
                  headerShown: false,
                }} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
