import React, {useEffect, useState, useSelector} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack'
import HomeScreen from '../../screens/homeScreen';
import {SplashScreen} from '../../screens/splashScreen';
import {AuthStackNavigation} from '../authStackNavigation';
import { DemoScreen } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../../components/customBottomTabBar';
import ProfileScreen from '../../screens/profileScreen';
import { IcCall, IcHomeMain, color, size } from '../../theme';
import { HomeStackNavigation } from '../homeStacknavigation';

const Stack = createNativeStackNavigator();


export const MainStackNavigation = () => {
  const [showSplashScreen, setHideSplashScreen] = useState(true);
  
  // const isUserLogin = useSelector(state => {
  //   return state?.authReducer?.isUserLogin;
  // });
  useEffect(() => {
    // localStorageValueGet();
    setTimeout(() => {
      setHideSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {showSplashScreen ? (
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
        {/* <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          
          }}
        /> */}
        <Stack.Screen
          name="homeStackNavigation"
          component={HomeStackNavigation}
          options={{
            headerShown: false,
          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
