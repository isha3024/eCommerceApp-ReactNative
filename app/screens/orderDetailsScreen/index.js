import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { color, IcBackArrow, IcMasterCard, IcSearch, images } from '../../theme'
import * as data from '../../json'
import * as styles from './styles'

const orderProducts = data.orderedProducts;

export const OrderDetailsScreen = ({route}) => {
  const {source} = route.params;
  const navigation = useNavigation()

  const showOrder = () => {
    let order;
    let textColor;
    switch (source) {
      case 'orderDelivered':
        order = 'Delivered';
        textColor = color.success;
        break;
      case 'orderProcessing':
        order = 'Processing';
        textColor = color.lightOrange;
        break;
      case 'orderCancelled':
        order = 'Cancelled';
        textColor = color.error;
        break;
      default:
        textColor = null;
    }
    return [textColor, order];
  }

  const handleReOrder = () => {
    navigation.navigate('cartStackNavigation')
  }

  const totalAmount = () => {
    let total = 0;
    orderProducts.map((product) => {
      total += product.productPrice * product.productQuantity;
    })
    return Math.floor(total);
  }

  return (
    <View style={styles.mainView()}>
      <Header 
        title
        headerTitle='Order Details'
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }}
        leftIconPress={() => navigation.goBack()}
        headerRightIcon
        rightIcon={() => {
          return (<IcSearch />)
        }}
        headerStyle={styles.header()}
      />
      <Screen withScroll bgColor={color.white}>
        <View style={styles.orderNoAndDate()}>
          <Text style={styles.h2()}>Order No 1947034</Text>
          <Text style={styles.date()}>05-12-2019</Text>
        </View>
        <View style={styles.justifySpaceBetween()}>
          <View style={styles.flexRow()}>
            <Text style={styles.date()}>Tracking number: </Text>
            <Text style={styles.trackingNumValue()}>IW3475453455</Text>
          </View>
          <Text style={[styles.successText(), {color: showOrder()[0]}]}>{showOrder()[1]}</Text>
        </View>
        <Text style={styles.darkTextItem()}>3 items</Text>
        <View style={styles.orderedItemsList()}>
          {
            orderProducts.map((product) => {
              return (
                <ProductCardMain
                  activeOpacity={0.7}
                  productHorizontal={true}
                  productImage={product.productImage}
                  productTitle={product.productName}
                  brandName={product.productBrand}
                  productColor={product.productColorSelected}
                  productSize={product.productSizeSelected}
                  originalPrice={product.productPrice}
                  productUnits={product.productQuantity}
                />
              )
            })
          }
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
            <Text style={styles.darkTextMedium()}>{totalAmount()}$</Text>
          </View>
        </View>
        <View style={styles.buttonContainer()}>
          <Button border title='Reorder' btnStyle={styles.button()} onPress={handleReOrder} />
          <Button title='Leave Feedback' btnStyle={styles.button()} />
        </View>
      </Screen>
    </View>
  )
}
