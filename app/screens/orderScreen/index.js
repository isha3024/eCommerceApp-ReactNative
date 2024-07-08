import React from 'react'

import * as styles from './styles'
import { CustomTopTabBar, Header, OrderCancelled, OrderDelivered, OrderProcessing, Text } from '../../components'
import { color, IcBackArrow, IcSearch } from '../../theme'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar, View } from 'react-native'


const Tab = createMaterialTopTabNavigator();
export const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainView()}>
      <StatusBar backgroundColor={color.primary}/>
      <View style={styles.topView()}>
        <Header 
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return (
              <IcBackArrow />
            )
          }}
          leftIconPress={() => navigation.goBack()}
          headerRightIcon
          rightIcon={() => {
            return (
              <IcSearch />
            )
          }}
        />
        <Text style={styles.mainTitle()}>My Orders</Text>
      </View>
      <Tab.Navigator tabBar={props => <CustomTopTabBar {...props} />}>
        <Tab.Screen component={OrderDelivered} name='orderDelivered' options={{
          tabBarLabel: 'Delivered'
        }}/>
        <Tab.Screen component={OrderProcessing} name='orderProcessing' options={{
          tabBarLabel: 'Processing'
        }}/>
        <Tab.Screen component={OrderCancelled} name='orderCancelled' options={{
          tabBarLabel: 'Cancelled'
        }}/>
      </Tab.Navigator>
    </View>
  )
}
