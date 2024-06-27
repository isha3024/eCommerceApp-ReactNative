import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopScreen, ShopScreenV2 } from '../../screens';


const Stack = createNativeStackNavigator();

export const ShopStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={ShopScreenV2} name='shopScreen'/>
    </Stack.Navigator>
  );
};
