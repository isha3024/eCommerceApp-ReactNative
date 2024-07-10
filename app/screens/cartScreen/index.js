import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native'

import * as styles from './styles'
import { Header, ProductCardMain, Text } from '../../components'
import { color, IcChevronRight, IcSearch } from '../../theme'
import * as data from '../../json'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const CartScreen = () => {

  const [orderedProducts, setOrderedProducts] = useState(data.orderedProducts);

  const increaseQuantity = (id) => {
    const updateCart = orderedProducts.map(cart => {
      if(cart.id === id) {
        return {...cart, productQuantity: cart.productQuantity + 1}
      }
      return cart;
    })
    setOrderedProducts(updateCart)
  }

  const decreaseQuantity = (id) => {
    const updateCart = orderedProducts.map(cart => {
      if (cart.id === id && cart.productQuantity > 1) {
        console.log('inside if')
        return { ...cart, productQuantity: cart.productQuantity - 1 };
      }
      return cart;
    });
    setOrderedProducts(updateCart);
  };

  const renderProducts = ({item}) => {
    return (
      <ProductCardMain
        productHorizontal
        productTitle={item.productName}
        productImage={item.productImage}
        originalPrice={item.productPrice}
        productColor={item.productColorSelected}
        productSize={item.productSizeSelected}
        showRatings={false}
        showRatingHorizontal={false}
        selectQuantity={item.productQuantity}
        increaseQuantity={() => increaseQuantity(item.id)}
        deccreaseQuantity={() => decreaseQuantity(item.id)}
      />
    )
  }

  return (
    <KeyboardAwareScrollView style={styles.mainView()}>
      <View style={styles.topView()}>
        <Header 
          headerStyle={styles.header()}
          headerRightIcon
          rightIcon={() => {
            return(<IcSearch />)
          }}
        />
        <Text style={styles.mainTitle()}>My Bag</Text>
      </View>
      <View style={styles.middleView()}>
        <View style={styles.orderedProducts()}>
          <FlatList 
            data={orderedProducts}
            renderItem={renderProducts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatList()}
          />
        </View>
        <View style={styles.promoCardWrapper()}>
          <TextInput 
            style={styles.promoCodeInput()}
            placeholder='Enter your promo code' 
            placeholderTextColor={color.darkGray}/>
          <View style={styles.forwardButton()}>
            <IcChevronRight />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
