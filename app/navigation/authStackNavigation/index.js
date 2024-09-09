import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgetPassword, LoginScreen, RegisterScreen } from '../../screens';


const AuthStack = createNativeStackNavigator();

export const AuthStackNavigation = () => {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
