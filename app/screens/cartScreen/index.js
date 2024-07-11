import React, { useEffect, useState } from 'react'
import { Animated, FlatList, Image, LogBox, TextInput, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { color, IcChevronRight, IcSearch, images, size } from '../../theme'
import * as data from '../../json'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

export const CartScreen = () => {

  const navigation = useNavigation()
  const [orderedProducts, setOrderedProducts] = useState(data.orderedProducts);
  const [showPromoCodeSheet, setShowPromoCodeSheet] = useState(false);
  const [promoCodes, setPromoCodes] = useState(data.promoCards);
  const [showCartOptions, setShowCartOptions] = useState({});
  const [selectedPromoCode, setSelectedPromoCode] = useState({});
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  // console.log('selectedPromoCode: ',selectedPromoCode);
  
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const applyPromoCode = (code) => {
    const promoCode = promoCodes.find((promo) => promo.code === code);
    const discountCode = promoCodes.find((promo) => promo.code === code).discount;
    setSelectedPromoCode(promoCode.code);
    setAppliedDiscount(discountCode);
    setTimeout(() => {
      setShowPromoCodeSheet(false)
    }, 300)
  }

  const increaseQuantity = (id) => {
    const updateCart = orderedProducts.map(cart => {
      if(cart.id === id) {
        const newProductQuantity = cart.productQuantity + 1;
        const newProductPrice = cart.productPrice * (newProductQuantity / cart.productQuantity)
        return {
          ...cart, 
          productQuantity: newProductQuantity,
          productPrice: newProductPrice
        }
      }
      return cart;
    })
    setOrderedProducts(updateCart)
  }

  const decreaseQuantity = (id) => {
    const updateCart = orderedProducts.map(cart => {
      if (cart.id === id && cart.productQuantity > 1) {
        const newProductQuantity = cart.productQuantity - 1;
        const newProductPrice = cart.productPrice / (cart.productQuantity / newProductQuantity)
        return { 
          ...cart, 
          productQuantity:newProductQuantity,
          productPrice: newProductPrice
        };
      }
      return cart;
    });
    setOrderedProducts(updateCart);
  };

  const showCartOptionsOfProduct = (id) => {
    setShowCartOptions((option) => {
     return {...option, [id]: !option[id]}
    });
  }

  const orderTotalAmount = () => {
    let total = 0;
    orderedProducts.forEach(product => {
      if(appliedDiscount){
        total += Number(product.productPrice) - (Number(product.productPrice) * appliedDiscount / 100);
      }
      else {
        total += Number(product.productPrice);
      }
    })
    return total;
  }

  const renderProducts = ({item}) => {
    
    return (
      <>
      <ProductCardMain
        // activeOpacity={1}
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
        cartOptions={true}
        cartOptionPress={() => showCartOptionsOfProduct(item.id)}
      />
      {
        showCartOptions[item.id] && (
            <Animated.View style={styles.cartOptions()}>
              <TouchableOpacity activeOpacity={0.6} style={[styles.cartOptionItem(), styles.cartOptionItemBorder()]}>
                <Text style={styles.cartOptionText()}>Add to favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.cartOptionItem()}>
                <Text style={styles.cartOptionText()}>Delete from list</Text>
              </TouchableOpacity>
            </Animated.View>
        )
      }
      </>
    )
  }

  return (   
    <Screen bgColor={color.primary} style={styles.mainView()}>
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
            ListHeaderComponent={<View />}
            data={orderedProducts}
            renderItem={renderProducts}
            style={styles.flatList()}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle()}
          />
        </View>
        <View style={styles.promoCardWrapper()}>  
          <TouchableOpacity onPress={() => setShowPromoCodeSheet(true)} activeOpacity={0.6}>
          <TextInput 
            style={styles.promoCodeInput()}
            value={selectedPromoCode ? selectedPromoCode :  ''}
            placeholder='Enter your promo code' 
            placeholderTextColor={color.darkGray}
            editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPromoCodeSheet(true)} activeOpacity={0.7} style={styles.forwardButton()}>
            <IcChevronRight />
          </TouchableOpacity>
        </View>
        <View style={styles.totalAmountView()}>
          <Text style={styles.totalAmountText()}>Total amount: </Text>
          <Text style={styles.totalAmount()}>{orderTotalAmount()}$</Text>
        </View>
        <Button 
          title='CHECK OUT'
          btnStyle={styles.button()}
          onPress={() => navigation.navigate('checkoutScreen')}
        />
      </View>
      <BottomSheetContainer
      isVisible={showPromoCodeSheet}
      customHeight={'60%'}
      onClose={() => setShowPromoCodeSheet(false)}
      >
        <View style={styles.promoCardWrapper()}>  
          <TouchableOpacity activeOpacity={0.6}>
          <TextInput 
            style={styles.promoCodeInput()}
            placeholder='Enter your promo code' 
            placeholderTextColor={color.darkGray}
            editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.forwardButton()}>
            <IcChevronRight />
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomSheetTitle()}>Your promo codes</Text>
        <BottomSheetScrollView
          style={styles.bottomSheetScroll()}
          contentContainerStyle={{ gap: size.moderateScale(16) }}>
          { 
            promoCodes.map((promoCode, id) => {
              return (
                <View key={id} style={styles.promoCard()}>
                  <View style={styles.promoCardImgView()}>
                    <Image source={promoCode.promoCodeImage} resizeMode='cover' style={styles.promoCardImg()} />
                  </View>
                  <View style={styles.promoCardContent()}>
                    <View style={styles.promoCardContentLeft()}>
                      <Text style={styles.promoCardTitle()}>{promoCode.title}</Text>
                      <Text style={styles.promoCardCode()}>{promoCode.code}</Text>
                    </View>
                    <View style={styles.promoCardContentRight()}>
                      <Text style={styles.promoCodeDays()}>{promoCode.offerValidity}</Text>
                      <Button
                        btnStyle={styles.applyBtn()}
                        title='Apply'
                        onPress={() => applyPromoCode(promoCode.code)}
                      />
                    </View>
                  </View>
                </View>
              )
          })}
          </BottomSheetScrollView>
      </BottomSheetContainer>
    </Screen>
  )
}