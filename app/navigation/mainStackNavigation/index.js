import React, {useEffect, useState, useSelector} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../../screens';
import { AuthStackNavigation } from '../authStackNavigation';
import { BottomStackNavigation } from '../bottomStackNavigation';

const Stack = createNativeStackNavigator();


export const MainStackNavigation = () => {
  const [showSplashScreen, setHideSplashScreen] = useState(true);

  useEffect(() => {
    // localStorageValueGet();
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
          <Stack.Screen
            name="authStackNavigation"
            component={AuthStackNavigation}
            options={{
              headerShown: false,
            }}
          />
        }
        <Stack.Screen
          name="bottomStackNavigation"
          component={BottomStackNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
