import React from 'react';
import { CartScreen, FavoriteScreen, HomeScreen, OnBoardingScreen, ProfileScreen, ShopScreen, ShopScreenV2 } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../../components';


const Tab = createBottomTabNavigator()

export const BottomStackNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name='homeScreen' component={HomeScreen} options={{
        tabBarLabel: 'Home'
      }}/>
      {/* <Tab.Screen name='onBoardingScreen' component={OnBoardingScreen} options={{
        tabBarLabel: 'Home'
      }}/> */}
      <Tab.Screen name='shopScreenV2' component={ShopScreenV2}options={{
        tabBarLabel: 'Shop'
      }}/>
      <Tab.Screen name='bagScreen' component={CartScreen}options={{
        tabBarLabel: 'Bag'
      }}/>
      <Tab.Screen name='favoriteScreen' component={FavoriteScreen}options={{
        tabBarLabel: 'Favorite'
      }}/>
      <Tab.Screen name='profileScreen' component={ProfileScreen}options={{
        tabBarLabel: 'Profile'
      }}/>
    </Tab.Navigator>
  );
};
