import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'

import * as styles from './styles'
import { Button, Header } from '../../components'
import { color, IcBackArrow, IcDHL, IcFedEx, IcMasterCard, IcUSPS, size } from '../../theme'
import { useMainContext } from '../../contexts/MainContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export const CheckoutScreen = ({ route }) => {

  const navigation = useNavigation();
  const orderTotal = route.params.orderTotal;
  const deliveryFees = 15;
  const orderAmountSummary = Number(orderTotal) + deliveryFees;

  const { selectedAddress, paymentCardSelected } = useMainContext()
  console.log('selectedAddress',Object.keys(selectedAddress).length);
  console.log('paymentCardSelected', paymentCardSelected);

  const cardNumberSlice = paymentCardSelected.cardNumber.slice(-4);
  const maskedNumber = '**** **** **** '+cardNumberSlice

  const handleCheckOut = () => {
    if(Object.keys(selectedAddress).length === 0) {
      ToastAndroid.show('Please select address', ToastAndroid.SHORT);
      return
    }
    if(Object.keys(paymentCardSelected).length === 0) {
      ToastAndroid.show('Please select payment method', ToastAndroid.SHORT);
      return
    }

    navigation.navigate('successScreen')
  }

  useFocusEffect(
    useCallback(() => {
      console.log('CheckoutScreen focus effect');
    },[selectedAddress, paymentCardSelected])
  )

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
