import React from 'react';
// import {LoginScreen} from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../../screens/registerScreen';
import LoginScreen from '../../screens/loginScreen';
import ForgetPassword from '../../screens/forgetPassword';

const AuthStack = createNativeStackNavigator();

export const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};
