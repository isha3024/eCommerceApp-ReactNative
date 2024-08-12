import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, Image, LogBox, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as data from '../../json'
import { color, IcChevronRight, IcClose, IcSearch, size } from '../../theme'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { useMainContext } from '../../contexts/MainContext'
import * as styles from './styles'

export const CartScreen = () => {

  const navigation = useNavigation();
  const {
    cartProductList,
    setCartProductList,
    allProducts,
    setAllProducts,
    saveProducts,
    saveCartProductList
  } = useMainContext();

  const [orderedProducts, setOrderedProducts] = useState(cartProductList);
  const [showPromoCodeSheet, setShowPromoCodeSheet] = useState(false);
  const [showCartOptions, setShowCartOptions] = useState(null);
  const [selectedPromoCode, setSelectedPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [originalPromoCodes, setOriginalPromoCodes] = useState(data.promoCards);
  const [totalAmount, setTotalAmount] = useState(null);
  const [visible, setVisible] = useState(false); // state for opacity


  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacityStyle = { opacity: opacityAnim };

  const fadeAnim = () => {
    Animated.timing(opacityAnim, {
      toValue: visible ? 0 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const applyPromoCode = (promoCode) => {
    const selectedPromoCode = originalPromoCodes.find((item) => item.code === promoCode.code);
    if (selectedPromoCode) {
      const { code, discount, title } = selectedPromoCode
      ToastAndroid.show(`${title} promocode applied`, ToastAndroid.SHORT)
      setSelectedPromoCode(code);
      setAppliedDiscount(discount);
      setShowPromoCodeSheet(false)
    }
  }

  const showCartOptionsOfProduct = (item) => {
    cartProductList.forEach((cartProduct) => {
      if (cartProduct.id === item.id) {
        setVisible((prev) => {
          fadeAnim();
          return !prev;
        });
        setShowCartOptions(cartProduct.id);
      }
    })
  }

  const handleAddToFavorites = (id) => {
    const updatedProducts = allProducts.map((product) => {
      if (product.id === id) {
        if (product.isFavorite) {
          ToastAndroid.show(`${product.name} is already in your favorites`, ToastAndroid.SHORT);
        } else {
          product.isFavorite = true;
          ToastAndroid.show(`${product.name} has been added to your favorites`, ToastAndroid.SHORT);
        }
      }
      return product;
    });
    setVisible(false)
    setAllProducts(updatedProducts);

    const updatedCartProduct = cartProductList.map((cartProduct) => {
      if (cartProduct.id == id) {
        return {
          ...cartProduct,
          isFavorite: true
        }
      }
      return cartProduct
    })
    setCartProductList(updatedCartProduct)
  }

  const handleDeleteFromCartList = async (item) => {
    try {
      const updateCartList = cartProductList.filter((cartProduct) => cartProduct.id !== item.id);
      await AsyncStorage.setItem('cartList', JSON.stringify(updateCartList));
      setCartProductList(updateCartList);
    }
    catch (error) {
      console.log('error: ', error);
    }
  }

  const handleSearchCode = (value) => {
    setPromoCodeValue(value);
    if (value.trim() === '') {
      setOriginalPromoCodes(data.promoCards);
    } else {
      const filteredCodes = data.promoCards.filter((code) => {
        return code.code.toLowerCase().includes(value.toLowerCase());
      });
      setOriginalPromoCodes(filteredCodes);
    }
  }

  const increaseProductQuantity = async (item) => {
    const updatedCartProduct = cartProductList.map((cartProduct) => {
      if (cartProduct.id === item.id) {
        if (cartProduct.stocks <= 0) {
          ToastAndroid.show(`${cartProduct.name} is out of stock`, ToastAndroid.SHORT);
        } else {
          cartProduct.productQuantity += 1;
          cartProduct.productPrice = (cartProduct.originalPrice * cartProduct.productQuantity).toFixed(2);
          cartProduct.stocks -= 1;
        }
      }
      return cartProduct;
    })
    setCartProductList(updatedCartProduct);

    const updateAllProducts = allProducts.map((product) => {
      if (product.id === item.id) {
        product.productQuantity += 1;
        product.stocks -= 1;
      }
      return product;
    })
    setAllProducts(updateAllProducts);

    await saveCartProductList(updatedCartProduct);
    await saveProducts(updateAllProducts)
  }

  const decreaseProductQuantity = async (item) => {
    const updatedCartProduct = cartProductList.map((cartProduct) => {
      if (cartProduct.id === item.id) {
        cartProduct.productQuantity -= 1;
        cartProduct.productPrice = (cartProduct.originalPrice * cartProduct.productQuantity).toFixed(2);
        cartProduct.stocks += 1;

        if (cartProduct.productQuantity < 1) {
          handleDeleteFromCartList(item)
          return null
        }
      }
      return cartProduct;
    }).filter(Boolean)
    setCartProductList(updatedCartProduct);

    const updateAllProducts = allProducts.map((product) => {
      if (product.id === item.id) {
        product.productQuantity -= 1;
        product.stocks += 1;
      }
      return product;
    })
    setAllProducts(updateAllProducts);



    await saveCartProductList(updatedCartProduct);
    await saveProducts(updateAllProducts)

  }

  const orderTotalAmount = () => {
    let total = 0;
    cartProductList.forEach((item) => {
      if (appliedDiscount && selectedPromoCode.length > 0) {
        total += item.originalPrice * item.productQuantity;
        const discountedTotal = (total - ((appliedDiscount * total) / 100)).toFixed(2);
        setTotalAmount(discountedTotal)
      }
      else {
        total += item.originalPrice * item.productQuantity;
        setTotalAmount(total.toFixed(2))
      }
    })
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  useFocusEffect(
    useCallback(() => {
      setOrderedProducts(cartProductList)
    }, [cartProductList])
  )

  useEffect(() => {
    orderTotalAmount()
  }, [cartProductList, appliedDiscount, selectedPromoCode])

  const renderProducts = ({ item }) => {
    return (
      <>
        <ProductCardMain
          activeOpacity={1}
          productHorizontal
          productTitle={item?.name}
          brandName={item?.brand}
          productImage={item?.images}
          originalPrice={item?.productPrice ?? item?.originalPrice}
          productColor={item?.productColor}
          productSize={item?.size}
          showRatings={false}
          showRatingHorizontal={false}
          productQuantitySelection={true}
          selectQuantity={item?.productQuantity}
          cartOptions={true}
          cartOptionPress={() => showCartOptionsOfProduct(item)}
          increaseQuantity={() => increaseProductQuantity(item)}
          deccreaseQuantity={() => decreaseProductQuantity(item)}
        />
        {
          showCartOptions === item.id && (
            <Animated.View style={[styles.cartOptions(), opacityStyle]}>
              <TouchableOpacity onPress={() => handleAddToFavorites(item.id)} activeOpacity={0.6} style={[styles.cartOptionItem(), styles.cartOptionItemBorder()]}>
                <Text style={styles.cartOptionText()}>Add to favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteFromCartList(item)} activeOpacity={0.6} style={styles.cartOptionItem()}>
                <Text style={styles.cartOptionText()}>Delete from list</Text>
              </TouchableOpacity>
            </Animated.View>
          )
        }
      </>
    )
  }

  return (
    <>
      <View style={styles.topView()}>
        <Header
          headerStyle={styles.header()}
          headerRightIcon
          rightIcon={() => {
            return (<IcSearch />)
          }}
        />
        <Text style={styles.mainTitle()}>My Bag</Text>
      </View>
      <Screen withScroll bgColor={color.primary} style={styles.mainView()} translucent={true}>
        <View style={styles.middleView()}>
          {
            orderedProducts.length > 0
              ? (
                <>
                  <View style={styles.orderedProducts()}>
                    <FlatList
                      // ListHeaderComponent={<View />}
                      data={orderedProducts}
                      renderItem={renderProducts}
                      style={styles.flatList()}
                      keyExtractor={(item) => item?.id?.toString() ?? Math.random().toString()}
                      contentContainerStyle={styles.contentContainerStyle()}
                      ListFooterComponent={<View />}
                    />
                  </View>
                </>
              )
              : (
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
      </Screen>
      {
        orderedProducts.length > 0
          ? (
            <View style={styles.bottomView()}>
              <View style={styles.promoCardWrapper()}>
                <TextInput
                  style={styles.promoCodeInput()}
                  value={selectedPromoCode ?? ''}
                  placeholder='Enter your promo code'
                  placeholderTextColor={color.darkGray}
                  editable={false}
                />
                {
                  selectedPromoCode.length > 0 ? (
                    <TouchableOpacity onPress={() => setSelectedPromoCode('')} activeOpacity={0.7} style={styles.forwardButton()}>
                      <IcClose width={size.moderateScale(20)} height={size.moderateScale(20)} fill={color.white} />
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
                <Text style={styles.totalAmount()}>{totalAmount}$</Text>
              </View>
              <Button
                title='CHECK OUT'
                btnStyle={styles.button()}
                onPress={() => navigation.navigate('checkoutScreen', { orderTotal: totalAmount, cartList: cartProductList })}
              />
            </View>
          ) 
          : (
            <View />
          )
      }
      <BottomSheetContainer
        isVisible={showPromoCodeSheet}
        customHeight={'60%'}
        onClose={() => setShowPromoCodeSheet(false)}
      >
        <View style={styles.promoCardWrapperBottomSheet()}>
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
        <View style={styles.promoCardList()}>
          {
            originalPromoCodes.map((promoCode, id) => {
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
                        onPress={() => applyPromoCode(promoCode)}
                      />
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>

      </BottomSheetContainer>
    </>
  )
}