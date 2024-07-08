import React from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import * as styles from './styles'
import { Text } from '../text';
import { Button } from '../button';

const orderCancelledDetails = [
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isCancelled: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isCancelled: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isCancelled: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isCancelled: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isCancelled: true
  },
]

export const OrderCancelled = () => {
  const navigation = useNavigation();
  const renderOrderCancelledSelected = ({item}) => {
    return(
      <View style={styles.orderedItem()}>
        <View style={styles.horizontal()}>
          <Text style={styles.orderNumText()}>Order No {item.orderNo}</Text>
          <Text style={styles.lightText()}>{item.orderDate}</Text>
        </View>
        <View style={styles.flexRow()}>
          <Text style={styles.lightText()}>Tracking number: </Text>
          <Text style={styles.darkText()}>{item.trackingNum}</Text>
        </View>
        <View style={styles.quantityTotalAmount()}>
          <View style={styles.flexRow()}>
            <Text style={styles.lightText()}>Quantity: </Text>
            <Text style={styles.quantityPriceText()}>{item.quantity}</Text>
          </View>
          <View style={styles.flexRow()}>
            <Text style={styles.lightText()}>Total Amount: </Text>
            <Text style={styles.quantityPriceText()}>{item.totalAmount}$</Text>
          </View>
        </View>
        <View style={styles.horizontalCenter()}>
          <Button
            border
            title='Details'
            btnStyle={styles.button()}
            onPress={() => navigation.navigate('orderDetailsScreen')}
          />
          <Text style={styles.cancelText()}>{item.isCancelled ? 'Cancelled' : null}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.orderInfo()}>
      <FlatList 
        data={orderCancelledDetails}
        renderItem={renderOrderCancelledSelected}
        contentContainerStyle={styles.flatListOrder()}
      />
    </View>
  )
}