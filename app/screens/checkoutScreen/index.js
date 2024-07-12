import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'

import * as styles from './styles'
import { Button, Header } from '../../components'
import { color, IcBackArrow, IcDHL, IcFedEx, IcMasterCard, IcUSPS, size } from '../../theme'
import { useMainContext } from '../../contexts/MainContext'
import { useNavigation } from '@react-navigation/native'

export const CheckoutScreen = ({route}) => {
  const navigation = useNavigation();
  const orderTotal = route.params.orderTotal;
  const deliveryAmount = 15;

  const orderAmountSummary = orderTotal + deliveryAmount;
  const checkoutAddress = useMainContext()?.selectedAddress;
  const paymentCardSelected = useMainContext()?.paymentCardSelected;

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
          <View style={styles.changeAddress()}>
            <Text style={styles.username()}>{checkoutAddress.name}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('addressScreen')}>
              <Text style={styles.redText()}>Change</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.bodyText()}>{checkoutAddress.address}</Text>
            <Text style={styles.bodyText()}>{checkoutAddress.city}, {checkoutAddress.province} {checkoutAddress.zipCode}, {checkoutAddress.country}</Text>
          </View>
        </View>
        <View style={styles.paymentContainer()}>
          <View style={styles.pamentSectionTitle()}>
            <Text style={styles.sectionTitle()}>Payment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('paymentMethodScreen')} activeOpacity={0.5}>
              <Text style={styles.redText()}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentDetails()}>
            <View style={styles.paymnetCard()}>
              <IcMasterCard width={size.moderateScale(32)} height={size.moderateScale(25)} />
            </View>
            <Text style={styles.bodyText()}>{paymentCardSelected.length !== 0 ? paymentCardSelected.maskedCardNumber : 'No Payment Card Selected'}</Text>
          </View>
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
          onPress={() => navigation.navigate('successScreen')}
        />
      </View>
    </View>
  )
}
