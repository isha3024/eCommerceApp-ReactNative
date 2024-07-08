import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import * as styles from './styles'
import { Button, Header, Screen, Text } from '../../components'
import { color, IcBackArrow, IcSearch } from '../../theme'
import { useNavigation } from '@react-navigation/native'


const orderDetails = ['Delivered', 'Processing', 'Cancelled'];
const orderItemDetails = [
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isDelivered: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isDelivered: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isDelivered: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isDelivered: true
  },
  {
    orderNo: 1947034,
    orderDate: '05-12-2019',
    trackingNum: 'IW3475453455',
    quantity: 3,
    totalAmount: 112,
    isDelivered: true
  },
]

export const OrderScreen = () => {

  const navigation = useNavigation();
  const [orderDetailSelected, setOrderDetailSelected] = useState(orderDetails[0])

  const handleOrderDetailPress = (item) => {
    // console.log('item: ', item);
    setOrderDetailSelected(item);
  }

  const renderOrderDetailsSelected = ({item}) => {
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
            <Text style={styles.darkBoldText()}>{item.quantity}</Text>
          </View>
          <View style={styles.flexRow()}>
            <Text style={styles.lightText()}>Total Amount: </Text>
            <Text style={styles.darkBoldText()}>{item.totalAmount}$</Text>
          </View>
        </View>
        <View style={styles.horizontalCenter()}>
          <Button
            border
            title='Details'
            btnStyle={styles.button()}
            onPress={() => navigation.navigate('orderDetailsScreen')}
          />
          <Text style={styles.successText()}>{item.isDelivered ? 'Delivered' : null}</Text>
        </View>
      </View>
    )
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
      <Screen style={styles.middleView()} bgColor={color.primary} translucent={true}>
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
        <View style={styles.orderInfo()}>
          <FlatList 
            data={orderItemDetails}
            renderItem={renderOrderDetailsSelected}
            contentContainerStyle={styles.flatListOrder()}
          />
        </View>
      </Screen>
    </View>
  )
}
