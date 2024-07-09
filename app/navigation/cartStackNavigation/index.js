import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from '../../screens';

const Stack = createNativeStackNavigator();

export const CartStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={CartScreen} name='cartScreen'/>
    </Stack.Navigator>
  );
};