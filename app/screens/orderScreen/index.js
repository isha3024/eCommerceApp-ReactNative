import { StatusBar, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import * as styles from './styles'
import { Header, Screen, Text } from '../../components'
import { color, IcBackArrow, IcSearch } from '../../theme'
import { useNavigation } from '@react-navigation/native'


const orderDetails = ['Delivered', 'Processing', 'Cancelled'];

export const OrderScreen = () => {

  const navigation = useNavigation();
  const [orderDetailSelected, setOrderDetailSelected] = useState(false)

  const handleOrderDetailPress = (item) => {
    // console.log('item: ', item);
    setOrderDetailSelected(item);
    console.log('orderDetailSelected: ', orderDetailSelected)
  }
  

  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <Header 
          title
          headerTitle='Order Details'
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
      <Screen withScroll style={styles.middleView()} bgColor={color.primary} translucent={true}>
        <View style={styles.orderDetails()}>
        {
          orderDetails.map((orderDetail, index) => {
            const isSelected = orderDetail === orderDetailSelected;
            console.log('isSelected: ', orderDetailSelected)
            return (
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleOrderDetailPress(orderDetail)} style={[styles.orderDetailItem(), isSelected && styles.orderDetailItemActive()]} key={index}>
                <Text style={[styles.orderDetailItemText(), isSelected && styles.orderDetailItemTextActive()]}>{orderDetail}</Text>
              </TouchableOpacity>
            )
          })
        }
        </View>
      </Screen>
    </View>
  )
}
