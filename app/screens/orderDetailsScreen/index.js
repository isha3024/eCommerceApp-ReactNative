import React from 'react'
import { StatusBar, View } from 'react-native'

import * as styles from './styles'
import { Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { color, IcBackArrow, IcMasterCard, IcSearch, images } from '../../theme'

export const OrderDetailsScreen = () => {
  return (
    <View style={styles.mainView()}>
      <Header 
        title
        headerTitle='Order Details'
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }}
        headerRightIcon
        rightIcon={() => {
          return (<IcSearch />)
        }}
        headerStyle={styles.header()}
      />
      <Screen withScroll bgColor={color.white}>
        <View style={styles.justifySpaceBetween()}>
          <Text style={styles.h2()}>Order No 1947034</Text>
          <Text style={styles.date()}>05-12-2019</Text>
        </View>
        <View style={styles.justifySpaceBetween()}>
          <View style={styles.flexRow()}>
            <Text style={styles.date()}>Tracking number: </Text>
            <Text style={styles.darkText()}>IW3475453455</Text>
          </View>
          <Text style={styles.successText()}>Delivered</Text>
        </View>
        <Text style={styles.darkTextItem()}>3 items</Text>
        <View style={styles.orderedItemsList()}>
          <ProductCardMain 
            activeOpacity={0.7}
            productHorizontal={true}
            productImage={images.ImgCard}
            productTitle='Pullover'
            brandName='Mango'
            productColor='Gray'
            productSize='L'
            originalPrice='51'
            productUnits={3}
          />
          <ProductCardMain 
            activeOpacity={0.7}
            productHorizontal={true}
            productImage={images.ImgCard}
            productTitle='Pullover'
            brandName='Mango'
            productColor='Gray'
            productSize='L'
            originalPrice='51'
            productUnits={3}
          />
          <ProductCardMain 
            activeOpacity={0.7}
            productHorizontal={true}
            productImage={images.ImgCard}
            productTitle='Pullover'
            brandName='Mango'
            productColor='Gray'
            productSize='L'
            originalPrice='51'
            productUnits={3}
          />
        </View>
        <View style={styles.orderInfo()}>
          <Text style={styles.orderInfoTitle()}>Order information</Text>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Shipping Address:</Text>
            <Text style={styles.darkTextAddress()}>3 Newbridge Court ,Chino Hills, 
            CA 91709, United States </Text>
          </View>
          <View style={styles.informationCenter()}>
            <Text style={styles.paymentText()}>Payment method:</Text>
            <View style={styles.paymentRow()}>
              <IcMasterCard style={styles.masterCard()} />
              <Text style={styles.cardNum()}>**** **** **** 3947</Text>
            </View>
            <Text style={styles.darkTextMedium()}></Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Delivery Method:</Text>
            <Text style={styles.darkTextMedium()}>FedEx, 3 days, 15$</Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Discount:</Text>
            <Text style={styles.darkTextMedium()}>10%, Personal promo code</Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Total Amount:</Text>
            <Text style={styles.darkTextMedium()}>133$</Text>
          </View>
        </View>
        <View style={styles.buttonContainer()}>
          <Button border title='Reorder' btnStyle={styles.button()} />
          <Button title='Leave Feedback' btnStyle={styles.button()} />
        </View>
      </Screen>
    </View>
  )
}
