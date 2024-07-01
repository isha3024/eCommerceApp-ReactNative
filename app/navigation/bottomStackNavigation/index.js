import React from 'react';
import { CartScreen, FavoriteScreen, HomeScreen, OnBoardingScreen, ProfileScreen, ShopScreen, ShopScreenV2 } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../../components';
import { ShopStackNavigation } from '../shopStackNavigation';
import { HomeStackNavigation } from '../homeStacknavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'filterScreen':
      return 'none';
    case 'brandScreen':
      return 'none';
  }
}

export const BottomStackNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name='homeStackNavigation' component={HomeStackNavigation} options={{
        tabBarLabel: 'Home'
      }}/>
      {/* <Tab.Screen name='onBoardingScreen' component={OnBoardingScreen} options={{
        tabBarLabel: 'Home'
      }}/> */}
      {/* <Tab.Screen name='shopScreenV2' component={ShopScreenV2} options={{
        tabBarLabel: 'Shop'
      }}/> */}
      <Tab.Screen 
        name='shopStackNavigation' 
        component={ShopStackNavigation} 
        options={({ route }) => ({
          tabBarLabel: 'Shop',
          tabBarStyle: {display: getRouteName(route)},
        })} 
      />
      <Tab.Screen name='bagScreen' component={CartScreen} options={{
        tabBarLabel: 'Bag'
      }}/>
      <Tab.Screen name='favoriteScreen' component={FavoriteScreen} options={{
        tabBarLabel: 'Favorite'
      }}/>
      <Tab.Screen name='profileScreen' component={ProfileScreen} options={{
        tabBarLabel: 'Profile'
      }}/>
    </Tab.Navigator>
  );
};
