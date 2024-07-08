import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderDetailsScreen, OrderScreen, ProfileScreen } from '../../screens';


const Stack = createNativeStackNavigator();

export const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={ProfileScreen} name='profileScreen'/>
      <Stack.Screen component={OrderScreen} name='orderScreen'/>
      <Stack.Screen name="orderDetailsScreen" component={OrderDetailsScreen} />   
    </Stack.Navigator>
  )
}