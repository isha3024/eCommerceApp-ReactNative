import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { color, IcBackArrow, IcMasterCard, IcSearch, images } from '../../theme'
import * as data from '../../json'
import * as styles from './styles'


export const OrderDetailsScreen = ({route}) => {

  const navigation = useNavigation()
  const {source, orderDetail} = route.params;

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
          <Text style={styles.h2()}>{orderDetail.orderNo}</Text>
          <Text style={styles.date()}>{orderDetail.date}</Text>
        </View>
        <View style={styles.justifySpaceBetween()}>
          <View style={styles.flexRow()}>
            <Text style={styles.date()}>Tracking number: </Text>
            <Text style={styles.trackingNumValue()}>{orderDetail.trackingNum}</Text>
          </View>
          <Text style={[styles.successText(), {color: showOrder()[0]}]}>{showOrder()[1]}</Text>
        </View>
        <Text style={styles.darkTextItem()}>{orderDetail.orderItem.length} items</Text>
        <View style={styles.orderedItemsList()}>
          {
            orderDetail.orderItem.map((product, index) => {
              return (
                <ProductCardMain
                  key={index}
                  activeOpacity={0.7}
                  productHorizontal={true}
                  productImage={product.images}
                  productTitle={product.name}
                  brandName={product.brand}
                  productColor={product.productColor}
                  productSize={product.size}
                  originalPrice={product.productPrice ?? product.originalPrice}
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
            <Text style={styles.darkTextAddress()}>
              {orderDetail.selectedAddress.addressLineOne}, 
              {orderDetail.selectedAddress.city}, 
              {orderDetail.selectedAddress.province}, 
              {orderDetail.selectedAddress.zipCode}, 
              {orderDetail.selectedAddress.country}
            </Text>
          </View>
          <View style={styles.informationCenter()}>
            <Text style={styles.paymentText()}>Payment method:</Text>
            <View style={styles.paymentRow()}>
              <IcMasterCard style={styles.masterCard()} />
              <Text style={styles.cardNum()}> **** **** **** {orderDetail.paymentCardSelected.cardNumber.slice(-4)}</Text>
            </View>
            <Text style={styles.darkTextMedium()}></Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Delivery Method:</Text>
            <Text style={styles.darkTextMedium()}>FedEx, 3 days, {orderDetail.deliveryFees}$</Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Discount:</Text>
            <Text style={styles.darkTextMedium()}>{orderDetail.orderItem[0].discount}%, Personal promo code</Text>
          </View>
          <View style={styles.information()}>
            <Text style={styles.lightText()}>Total Amount:</Text>
            <Text style={styles.darkTextMedium()}>{orderDetail.orderAmountSummary}$</Text>
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
