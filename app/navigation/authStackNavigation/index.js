import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgetPassword, LoginScreen, RegisterScreen } from '../../screens';


const AuthStack = createNativeStackNavigator();

export const AuthStackNavigation = () => {

  const isUserRegistered = useSelector(state => state.authUser.isUserRegistered);
  const isUserLoggedIn = useSelector(state => state.authUser.isUserLoggedIn);

  console.log('isUserRegistered:',isUserRegistered)
  console.log('isUserLoggedIn:',isUserLoggedIn)


  return (
    <AuthStack.Navigator>
      {
        isUserRegistered && !isUserLoggedIn && (
          <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        )
      }
      {
        !isUserRegistered && !isUserLoggedIn && (
          <>
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
        </>
        )
      }
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};
