import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/app'
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore'

import { Button } from '../button'
import { Text } from '../text'
import * as styles from './styles'
import { useMainContext } from '../../contexts/MainContext'
import { useSelector } from 'react-redux'
import { Screen } from '../screen'
import { color, size } from '../../theme'


export const OrderDelivered = () => {

  const navigation = useNavigation();
  const db = getFirestore();
  const { userInfo } = useSelector(state => state.authUser);

  const {orders, getOrdersFromStorage} = useMainContext();
  
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchUserOrders = async () => {
    const userDocId = firebase.firestore().collection('users').doc(userInfo.uid).id;
    const userOrdersRef = doc(db, `users/${userDocId}/userOrders/userOrdersList`);


    setLoading(true)
    try {
      const docSnap = await getDoc(userOrdersRef);
      if (docSnap.exists) {
        const orders = docSnap.data().userOrdersList;
        setOrderDetails(orders);
        setLoading(false)
      }
      else {
        setOrdersPlaced(0)
      }
    }
    catch (error) {
      setLoading(false)
      console.log("Error fetching user orders from Firestore!!",error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleOrderDetailScreen = (item) => {
    console.log("orderedItem: ",item)
    navigation.navigate('orderDetailsScreen', { orderDetail: item })
  }


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
            onPress={() => handleOrderDetailScreen(item)}
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

  useEffect(() => {
    fetchUserOrders()
  },[])

  return (
    <Screen style={styles.orderInfo()} loading={loading} bgColor={color.primary} translucent={true} loaderPosition={size.deviceHeight - 300}>
      {
        orderDetails && orderDetails.length > 0  
        ? (
      <FlatList 
        data={orderDetails}
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
      
    </Screen>
  )
}