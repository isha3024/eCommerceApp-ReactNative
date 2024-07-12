import React, { useEffect, useState } from 'react'
import { Animated, FlatList, Image, LogBox, TextInput, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { color, IcChevronRight, IcClose, IcSearch, size } from '../../theme'
import * as data from '../../json'
import { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

export const CartScreen = () => {

  const navigation = useNavigation()
  const [orderedProducts, setOrderedProducts] = useState(data.orderedProducts);
  const [showPromoCodeSheet, setShowPromoCodeSheet] = useState(false);
  // const [promoCodes, setPromoCodes] = useState(data.promoCards);
  const [showCartOptions, setShowCartOptions] = useState({});
  const [selectedPromoCode, setSelectedPromoCode] = useState({});
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [originalPromoCodes, setOriginalPromoCodes] = useState(data.promoCards);
  // console.log('originalPromoCodes:', originalPromoCodes);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState(data.promoCards);
  console.log('filteredPromoCodes: ',filteredPromoCodes);
  
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const applyPromoCode = (code) => {
    const promoCode = filteredPromoCodes.find((promo) => promo.code === code);
    const discountCode = filteredPromoCodes.find((promo) => promo.code === code).discount;
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
      if(appliedDiscount && selectedPromoCode.length > 0){
        total += (product.productPrice) - (product.productPrice * (appliedDiscount / 100));
      }
      else {
        total += (product.productPrice);
      }
    })
    return total;
  }

  const removeFromCart = (id) => {
    const updateCart = orderedProducts.filter(cart => cart.id !== id);
    setOrderedProducts(updateCart);
  }

  const addToFavorite = (id) => {
    const updateCart = orderedProducts.map(cart => {
      if (cart.id === id) {
        return {
          ...cart, 
          isFavorite: !cart.isFavorite
        }
      }
      return cart;
    })
    setOrderedProducts(updateCart);
    showCartOptions()
  }

  // const handleSearchCode = (value) => {
  //   setPromoCodeValue(value);
  //   const filteredCodes = originalPromoCodes.filter((code)=>{
  //     return code.code.toLowerCase().includes(value.toLowerCase())
  //   })
  //   console.log('handleSearchCode called with value:', filteredCodes.find(discount => discount.id).code);
  //   setFilteredPromoCodes(filteredCodes.find(discount => discount.id));
  // }
  const handleSearchCode = (value) => {
    setPromoCodeValue(value);
    const filteredCodes = originalPromoCodes.filter((code) => {
      return code.code.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredPromoCodes(filteredCodes);
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
              <TouchableOpacity onPress={() => addToFavorite(item.id)} activeOpacity={0.6} style={[styles.cartOptionItem(), styles.cartOptionItemBorder()]}>
                <Text style={styles.cartOptionText()}>Add to favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} activeOpacity={0.6} style={styles.cartOptionItem()}>
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
        {
          orderedProducts.length > 0 ? (
            <>
              <View style={styles.promoCardWrapper()}>
                <TextInput
                  style={styles.promoCodeInput()}
                  value={selectedPromoCode ? selectedPromoCode : ''}
                  placeholder='Enter your promo code'
                  placeholderTextColor={color.darkGray}
                  editable={false}
                />
                {
                  selectedPromoCode.length > 0 ? (
                    <TouchableOpacity onPress={() => setSelectedPromoCode('')} activeOpacity={0.7} style={styles.forwardButton()}>
                      <IcClose width={size.moderateScale(20)} height={size.moderateScale(20)} fill={color.white}/>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowPromoCodeSheet(true)} activeOpacity={0.7} style={styles.forwardButton()}>
                      <IcChevronRight />
                    </TouchableOpacity>
                  )
                }
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
            </>
          ) : 
          (
            <View style={styles.orderListEmpty()}>
              <Text style={styles.orderListEmptyText()}>No orders placed</Text>
              <Text style={styles.orderListAddProductText()}>You have products from your wishlist waiting to be yours</Text>
              <View style={styles.buttonWrapper()}>
                <Button 
                  title='Continue Shopping'
                  border
                  btnStyle={styles.buttonEmpty()}
                  onPress={() => navigation.navigate('homeStackNavigation')}
                />
                <Button 
                  title='Add from Wishlist'
                  btnStyle={styles.buttonEmpty()}
                  onPress={() => navigation.navigate('favoriteStackNavigation')}
                />
              </View>
            </View>
          ) 
        }
      </View>
      <BottomSheetContainer
      isVisible={showPromoCodeSheet}
      customHeight={'60%'}
      onClose={() => setShowPromoCodeSheet(false)}
      >
        <View style={styles.promoCardWrapper()}>
          <TextInput
            style={styles.promoCodeInput()}
            placeholder='Enter your promo code'
            placeholderTextColor={color.darkGray}
            editable={true}
            keyboardType='default'
            autoCapitalize='none'
            value={promoCodeValue}
            onChangeText={handleSearchCode}
          />
          {
            promoCodeValue.length > 0 ? (
              <TouchableOpacity onPress={() => setPromoCodeValue('')} activeOpacity={0.7} style={styles.forwardButton()}>
                <IcClose width={size.moderateScale(20)} height={size.moderateScale(20)} fill={color.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.7} style={styles.forwardButton()}>
                <IcChevronRight />
              </TouchableOpacity>
            )
          }
        </View>
        <Text style={styles.bottomSheetTitle()}>Your promo codes</Text>
        <View>
          
        </View>
        {
          filteredPromoCodes.map((promoCode, id) => {
            return(
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
          })
        }
      </BottomSheetContainer>
    </Screen>
  )
}