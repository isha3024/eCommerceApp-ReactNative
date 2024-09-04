import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import {  useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { useSelector } from 'react-redux'

import { color, IcBackArrow, IcDHL, IcFedEx, IcMasterCard, IcUSPS, size } from '../../theme'
import { useMainContext } from '../../contexts/MainContext'
import { Button, Header, Screen } from '../../components'
import * as styles from './styles'
import { doc, getFirestore, updateDoc } from '@react-native-firebase/firestore'

export const CheckoutScreen = ({ route }) => {

  const navigation = useNavigation();
  const { userInfo } = useSelector(state => state.authUser);
  const db = getFirestore

  const {orderTotal, appliedDiscount} = route.params;
  let cartList = route.params.cartList;

  const deliveryFees = 15;
  const orderAmountSummary = (Number(orderTotal) + deliveryFees).toFixed(2);
  const { selectedAddress, paymentCardSelected, orders, saveOrders, setCartProductList, saveCartProductList } = useMainContext();


  const [maskedNumber, setMaskedNumber] = useState('');
  const [loading, setLoading] = useState(false);

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
    return 'IW'+Math.floor(Math.random() * 100000) + 100000
  }

  const emptyCartList = async () => {
    const db = getFirestore();
    const userDocId = firebase.firestore().collection('users').doc(userInfo.uid).id;
    const cartDocRef = doc(db, `users/${userDocId}/cartProducts/cartList`);
  
    try {
      await updateDoc(cartDocRef, {
        productsInCart: [],
      });
      console.log('CartList has been emptied.');
    } catch (error) {
      console.error('Error emptying CartList:', error);
    }
  };

  const handleCheckOut = async () => {
    if (Object.keys(selectedAddress).length === 0) {
      ToastAndroid.show('Please select address', ToastAndroid.SHORT);
      return;
    }
    if (Object.keys(paymentCardSelected).length === 0) {
      ToastAndroid.show('Please select payment method', ToastAndroid.SHORT);
      return;
    }

    const newOrder = {
      orderNo: generateRandomOrderNo(),
      date: generateOrderDate(),
      trackingNum: generateTrackingNumber(),
      orderAmountSummary: orderAmountSummary,
      orderItem: cartList,
      orderAmount: orderTotal,
      appliedDiscount: appliedDiscount,
      deliveryFees: deliveryFees,
      selectedAddress: selectedAddress,
      paymentCardSelected: paymentCardSelected,
    };

    let updatedOrders = [...orders, newOrder];

    const userDocRef = firebase.firestore().collection('users').doc(userInfo.uid);
    const userOrdersDocRef = userDocRef.collection('userOrders').doc('userOrdersList');
    setLoading(true);
    try {
      const docSnap = await userOrdersDocRef.get();
      if (docSnap.exists) {
        const data = docSnap.data();

        const userOrdersList = data.userOrdersList || [];

        updatedOrders = [...userOrdersList, newOrder];
        const updatedData = { ...data, userOrdersList: updatedOrders };
        await userOrdersDocRef.update(updatedData);
        await emptyCartList()
      } else {
        await userOrdersDocRef.set({ userOrdersList: updatedOrders });
        await emptyCartList()
      }
      navigation.navigate('successScreen');
    } catch (error) {
      console.log('Error!! DocSnap for userOrders does not exist!!!', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentCardSelected && paymentCardSelected.cardNumber) {
      let sliceNumber = paymentCardSelected.cardNumber.slice(-4);
      let num = '**** **** **** ' + sliceNumber;
      setMaskedNumber(num);
    }
  }, [paymentCardSelected]);

  return (
    <Screen style={styles.mainView()} loading={loading} bgColor={color.primary} translucent={true}>
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
    </Screen>
  )
}
