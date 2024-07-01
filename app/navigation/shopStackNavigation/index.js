import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogeScreen, FilterScreen, ShopScreen, ShopScreenV2 } from '../../screens';
import BrandScreen from '../../screens/brandScreen';


const Stack = createNativeStackNavigator();

export const ShopStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
      }}>
      <Stack.Screen component={ShopScreenV2} name='shopScreen'/>
      <Stack.Screen component={CatalogeScreen} name='catalogeScreen'/>
      <Stack.Screen component={FilterScreen} name='filterScreen'/>
      <Stack.Screen component={BrandScreen} name='brandScreen'/>
    </Stack.Navigator>
  );
};
