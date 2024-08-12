import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import {  useNavigation } from '@react-navigation/native'

import { color, IcBackArrow, IcDHL, IcFedEx, IcMasterCard, IcUSPS, size } from '../../theme'
import { useMainContext } from '../../contexts/MainContext'
import { Button, Header } from '../../components'
import * as styles from './styles'

export const CheckoutScreen = ({ route }) => {

  const navigation = useNavigation();
  const orderTotal = route.params.orderTotal;
  const cartList = route.params.cartList;
  const deliveryFees = 15;
  const orderAmountSummary = (Number(orderTotal) + deliveryFees).toFixed(2);

  const { selectedAddress, paymentCardSelected, orders, saveOrders, setCartProductList, saveCartProductList } = useMainContext();


  const [maskedNumber, setMaskedNumber] = useState('');

  const generateRandomOrderNo = () => {
    return 'Order №'+Math.floor(Math.random() * 101) + 100;
  }

  const generateOrderDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`
  }

  const generateTrackingNumber = () => {
    return 'IW'+Math.floor(Math.random() * 1000000000) + 1000000000
  }

  const handleCheckOut = () => {
    if(Object.keys(selectedAddress).length === 0) {
      ToastAndroid.show('Please select address', ToastAndroid.SHORT);
      return
    }
    if(Object.keys(paymentCardSelected).length === 0) {
      ToastAndroid.show('Please select payment method', ToastAndroid.SHORT);
      return
    }

    const newOrder = {
      orderNo: generateRandomOrderNo(),
      date: generateOrderDate(),
      trackingNum: generateTrackingNumber(),
      orderAmountSummary: orderAmountSummary,
      orderItem: cartList,
      orderAmount: orderTotal,
      deliveryFees: deliveryFees,
      selectedAddress: selectedAddress,
      paymentCardSelected: paymentCardSelected,
    }

    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);

    setCartProductList([])
    saveCartProductList([]);
    navigation.navigate('successScreen')
  }

  useEffect(() => {
    if (paymentCardSelected && paymentCardSelected.cardNumber) {
      let sliceNumber = paymentCardSelected.cardNumber.slice(-4);
      let num = '**** **** **** ' + sliceNumber;
      setMaskedNumber(num);
    }
  }, [paymentCardSelected]);

  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <StatusBar translucent backgroundColor={color.primary} />
        <Header
          headerStyle={styles.header()}
          title
          headerTitle='Checkout'
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
          leftIconPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.middleView()}>
        <Text style={styles.sectionTitle()}>Shipping address</Text>
        <View style={styles.addressContainer()}>
          {
            Object.keys(selectedAddress).length !== 0
              ? (
                <>
                  <View style={styles.changeAddress()}>
                    <Text style={styles.username()}>{selectedAddress.name}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('addressScreen')}>
                      <Text style={styles.redText()}>Change</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.bodyText()}>{selectedAddress.addressLineOne}</Text>
                    <Text style={styles.bodyText()}>{selectedAddress.city}, {selectedAddress.zipCode}, {selectedAddress.country}</Text>
                  </View>
                </>
              )
              : (
                  <View style={styles.emptyField()}>
                  <Text style={styles.emptyFieldText()}>No address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('addressScreen')} style={styles.redTextView()}>
                    <Text style={styles.redText()}>+ Add Address</Text>
                  </TouchableOpacity>
                </View>
              )
          }
        </View>
        <View style={styles.paymentContainer()}>
          <View style={styles.pamentSectionTitle()}>
            <Text style={styles.sectionTitle()}>Payment</Text>
            {
              Object.keys(paymentCardSelected).length !== 0 &&
              (
                <TouchableOpacity onPress={() => navigation.navigate('paymentMethodScreen')} activeOpacity={0.5}>
                  <Text style={styles.redText()}>Change</Text>
                </TouchableOpacity>
              )
            }
          </View>
          {
            Object.keys(paymentCardSelected).length === 0
              ? (
                <View style={styles.addressContainer()}>
                  <View style={styles.emptyField()}>
                    <Text style={styles.emptyFieldText()}>No card</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('paymentMethodScreen')} style={styles.redTextView()}>
                      <Text style={styles.redText()}>+ Add Payment Card</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
              : (
                <View style={styles.paymentDetails()}>
                  <View style={styles.paymnetCard()}>
                    <IcMasterCard width={size.moderateScale(32)} height={size.moderateScale(25)} />
                  </View>
                  <Text style={styles.bodyText()}>{maskedNumber}</Text>
                </View>
              )
          }
        </View>
        <Text style={styles.sectionTitle()}>Delivery method</Text>
        <View style={styles.deliveryMethodsList()}>
          <TouchableOpacity activeOpacity={0.6} style={styles.deliveryMethodItem()}>
            <IcFedEx />
            <Text style={styles.lightText()}>2-3 days</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.deliveryMethodItem()}>
            <IcUSPS />
            <Text style={styles.lightText()}>2-3 days</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.deliveryMethodItem()}>
            <IcDHL />
            <Text style={styles.lightText()}>2-3 days</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderCharges()}>
          <View style={styles.spaceBetween()}>
            <Text style={styles.bodyTextLight()}>Order:</Text>
            <Text style={styles.bodyTextBlack()}>{orderTotal}$</Text>
          </View>
          <View style={styles.spaceBetween()}>
            <Text style={styles.bodyTextLight()}>Delivery:</Text>
            <Text style={styles.bodyTextBlack()}>15$</Text>
          </View>
          <View style={styles.spaceBetween()}>
            <Text style={styles.bodyTextBold()}>Summary:</Text>
            <Text style={styles.bodyTextBlackBold()}>{orderAmountSummary}$</Text>
          </View>
        </View>
        <Button
          title="SUBMIT ORDER"
          onPress={handleCheckOut}
        />
      </View>
    </View>
  )
}
