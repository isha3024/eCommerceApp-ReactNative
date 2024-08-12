import React, { useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Button } from '../button'
import { Text } from '../text'
import * as styles from './styles'
import { useMainContext } from '../../contexts/MainContext'


export const OrderDelivered = () => {

  const navigation = useNavigation();
  const {orders, getOrdersFromStorage} = useMainContext();
  console.log('orders: ',orders.length)
  const renderOrderDetailsSelected = ({item}) => {
    return(
      <View style={styles.orderedItem()}>
        <View style={styles.horizontal()}>
          <Text style={styles.orderNumText()}>{item.orderNo}</Text>
          <Text style={styles.lightText()}>{item.date}</Text>
        </View>
        <View style={styles.flexRow()}>
          <Text style={styles.lightText()}>Tracking number: </Text>
          <Text style={styles.darkText()}>{item.trackingNum}</Text>
        </View>
        <View style={styles.quantityTotalAmount()}>
          <View style={styles.flexRow()}>
            <Text style={styles.lightText()}>Quantity: </Text>
            <Text style={styles.quantityPriceText()}>{item.orderItem.length}</Text>
          </View>
          <View style={styles.flexRow()}>
            <Text style={styles.lightText()}>Total Amount: </Text>
            <Text style={styles.quantityPriceText()}>{item.orderAmount}$</Text>
          </View>
        </View>
        <View style={styles.horizontalCenter()}>
          <Button
            border
            title='Details'
            btnStyle={styles.button()}
            onPress={() => navigation.navigate('orderDetailsScreen', {source: 'orderDelivered', orderDetail: item})}
          />
          <Text style={styles.successText()}>Delivered</Text>
        </View>
      </View>
    )
  }

  useFocusEffect(
    useCallback(() => {
      getOrdersFromStorage()
    },[])
  )

  return (
    <View style={styles.orderInfo()}>
      {
        orders && orders.length > 0  
        ? (
      <FlatList 
        data={orders}
        renderItem={renderOrderDetailsSelected}
        contentContainerStyle={styles.flatListOrder()}
      />
        )
        : (
          <View style={styles.emptyOrderInfo()}>
            <Text style={styles.emptyOrderText()}>No orders delivered!</Text>
            <Button 
              title='Continue Shopping'
              btnStyle={styles.buttonContShop()}
              onPress={() => navigation.navigate('homeStackNavigation')}
            />
          </View>
        )
      }
      
    </View>
  )
}