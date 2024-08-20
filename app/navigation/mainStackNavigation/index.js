import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddNewAddressScreen, AddressScreen, BrandScreen, CameraScreen, CaptureImageScreen, CheckoutScreen, DemoScreen, FilterScreen, ImagesScreen, MainProductScreen, PaymentMethodScreen, RatingsReviewsScreen, SettingsScreen, SplashScreen, SuccessScreen } from '../../screens';
import { AuthStackNavigation } from '../authStackNavigation';
import { BottomStackNavigation } from '../bottomStackNavigation';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();


export const MainStackNavigation = () => {

  const isUserLoggedIn = useSelector(state => state.authUser.isUserLoggedIn);
  const [showSplashScreen, setHideSplashScreen] = useState(true);

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
        {/* <Stack.Screen
          name="authStackNavigation"
          component={AuthStackNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="bottomStackNavigation"
          component={BottomStackNavigation}
          options={{
            headerShown: false,
          }}
        /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
