import React from 'react';
import { CartScreen, FavoriteScreen, HomeScreen, OnBoardingScreen, ProfileScreen, ShopScreen, ShopScreenV2 } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../../components';
import { HomeStackNavigation } from '../homeStacknavigation';
import { ShopStackNavigation } from '../shopStackNavigation';
import { ProfileStackNavigation } from '../profileStackNavigation';
import { FavoriteStackNavigation } from '../favoriteStackNavigation';
import { CartStackNavigation } from '../cartStackNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export const BottomStackNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}
      initialRouteName='homeStackNavigation'
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
        })} 
      />
      <Tab.Screen name='cartStackNavigation' component={CartStackNavigation} options={{
        tabBarLabel: 'Bag'
      }}/>
      <Tab.Screen name='favoriteStackNavigation' component={FavoriteStackNavigation} options={{
        tabBarLabel: 'Favorite'
      }}/>
      <Tab.Screen name='profileStackNavigation' component={ProfileStackNavigation} options={{
        tabBarLabel: 'Profile'
      }}/>
    </Tab.Navigator>
  );
};
