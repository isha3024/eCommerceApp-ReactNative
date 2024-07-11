import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'

import * as styles from './styles'
import { Button, Header } from '../../components'
import { color, IcBackArrow, IcDHL, IcFedEx, IcMasterCard, IcUSPS, size } from '../../theme'
import { useMainContext } from '../../contexts/MainContext'
import { useNavigation } from '@react-navigation/native'

export const CheckoutScreen = () => {
  const navigation = useNavigation()
  const checkoutAddress = useMainContext()?.selectedAddress;
  console.log('checkoutAddress: ', checkoutAddress)

  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <StatusBar translucent backgroundColor={color.primary}/>
        <Header 
          headerStyle={styles.header()}
          title
          headerTitle='Checkout'
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
        />
      </View>
      <View style={styles.middleView()}>
        <Text style={styles.sectionTitle()}>Shipping address</Text>
        <View style={styles.addressContainer()}>
          <View style={styles.changeAddress()}>
            <Text style={styles.username()}>Jane Doe</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.redText()}>Change</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.bodyText()}>3 Newbridge Court</Text>
            <Text style={styles.bodyText()}>Chino Hills, CA 91709, United States</Text>
          </View>
        </View>
        <View style={styles.paymentContainer()}>
          <View style={styles.pamentSectionTitle()}>
            <Text style={styles.sectionTitle()}>Payment</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.redText()}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentDetails()}>
            <View style={styles.paymnetCard()}>
              <IcMasterCard width={size.moderateScale(32)} height={size.moderateScale(25)} />
            </View>
            <Text style={styles.bodyText()}>* * * *   * * * *   * * * *   3947</Text>
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
            <Text style={styles.bodyTextBlack()}>112$</Text>
          </View>
          <View style={styles.spaceBetween()}>
            <Text style={styles.bodyTextLight()}>Delivery:</Text>
            <Text style={styles.bodyTextBlack()}>15$</Text>
          </View>
          <View style={styles.spaceBetween()}>
            <Text style={styles.bodyTextBold()}>Summary:</Text>
            <Text style={styles.bodyTextBlackBold()}>127$</Text>
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
