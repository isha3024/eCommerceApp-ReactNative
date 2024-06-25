import React from 'react';
import { CartScreen, FavoriteScreen, HomeScreen, ProfileScreen, ShopScreen } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../../components/customBottomTabBar';

const Tab = createBottomTabNavigator()


export const HomeStackNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Shop' component={ShopScreen}/>
      <Tab.Screen name='Bag' component={CartScreen}/>
      <Tab.Screen name='Favorite' component={FavoriteScreen}/>
      <Tab.Screen name='Profile' component={ProfileScreen}/>
    </Tab.Navigator>
  );
};
