import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens';



const Stack = createNativeStackNavigator();

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name='homeScreen'/>
    </Stack.Navigator>
  );
};
