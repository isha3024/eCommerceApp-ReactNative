import React, {useEffect, useState, useSelector} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrandScreen, FilterScreen, MainProductScreen, RatingsReviewsScreen, SettingsScreen, SplashScreen } from '../../screens';
import { AuthStackNavigation } from '../authStackNavigation';
import { BottomStackNavigation } from '../bottomStackNavigation';
import { color } from '../../theme';

const Stack = createNativeStackNavigator();


export const MainStackNavigation = () => {
  const [showSplashScreen, setHideSplashScreen] = useState(true);

  useEffect(() => {
    // localStorageValueGet();
    setTimeout(() => {
      setHideSplashScreen(false);
    }, 1000);
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
        {/* {
          <Stack.Screen
            name="authStackNavigation"
            component={AuthStackNavigation}
            options={{
              headerShown: false,
            }}
          />
        } */}
        <Stack.Screen
          name="bottomStackNavigation"
          component={BottomStackNavigation}
          options={{
            headerShown: false,
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
