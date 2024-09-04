import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, Image, LogBox, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '@react-native-firebase/app'
import { doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore'

import * as data from '../../json'
import { color, IcChevronRight, IcClose, IcSearch, size } from '../../theme'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { useMainContext } from '../../contexts/MainContext'
import * as styles from './styles'
import { toggleFavorite, updateFavorites } from '../../redux'

export const CartScreen = () => {

  const navigation = useNavigation();
  const db = getFirestore();
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.authUser);
  const {
    cartProductIds,
    setCartProductIds,
  } = useMainContext();

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [showPromoCodeSheet, setShowPromoCodeSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCartOptions, setShowCartOptions] = useState(null);
  const [selectedPromoCode, setSelectedPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [originalPromoCodes, setOriginalPromoCodes] = useState(data.promoCards);
  const [totalAmount, setTotalAmount] = useState(0);
  const [visible, setVisible] = useState(false); // state for opacity


  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacityStyle = { opacity: opacityAnim };

  const fetchCartProduct = async () => {
    const userDocId = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid).id;

    const userDocRef = firebase.firestore().collection('users')
      .doc(userDocId).collection('cartProducts').doc('cartList');

    setLoading(true)
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        const cartProducts = data.productsInCart || [];

        const productsSnapshot = await firebase.firestore().collection('products').get();
        const productLists = productsSnapshot.docs.map(doc => doc.data());
        const showCartProducts = productLists.filter(product => cartProducts.some(cartItem => cartItem.id === product.id));
        setOrderedProducts(showCartProducts);
      } else {
        console.log('No cart document found for the user!');
      }
    } catch (error) {
      console.log('Error fetching cart products:', error);
    } finally {
      setLoading(false)
    }
  };


  const fadeAnim = () => {
    Animated.timing(opacityAnim, {
      toValue: visible ? 0 : 1,
      duration: 150,
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
    orderedProducts.forEach((cartProduct) => {
      if (cartProduct.id === item.id) {
        setVisible((prev) => {
          fadeAnim();
          return !prev;
        });
        setShowCartOptions(cartProduct.id);
      }
    })
  }

  const handleAddToFavorites = async (item) => {
    const userFavoriteRef = firebase.firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList')

    try {
      const doc = await userFavoriteRef.get();
      let favoriteProducts = doc.exists ? (doc.data().productIds || []) : [];

      if (favoriteProducts.includes(item?.id)) {
        ToastAndroid.show(`${item?.title} already exists in Favorites`, ToastAndroid.SHORT);
      } else {
        favoriteProducts.push(item?.id);
        await userFavoriteRef.set({ productIds: favoriteProducts });
        ToastAndroid.show(`${item?.title} added to Favorites`, ToastAndroid.SHORT);
      }

      dispatch(toggleFavorite(item.id));
      dispatch(updateFavorites(favoriteProducts));
    }
    catch (error) {
      console.log('Error:', error);
    }
  }

  const handleDeleteFromCartList = async (item) => {
    const userDocId = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid).id;

    const productsSnapshot = await firebase.firestore().collection('products').get();
    const productList = productsSnapshot.docs.map(doc => {
      const productData = doc.data();
      return productData;
    });

    const docRef = doc(db, `users/${userDocId}/cartProducts/cartList`);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        const data = docSnap.data();
        const productIds = data.productIds || [];
        console.log('productIds: ', productIds);
        console.log('itemId: ', item.id)
        if (productIds.includes(item.id)) {
          const index = productIds.indexOf(item.id);
          productIds.splice(index, 1);
          await firebase.firestore().collection('users').doc(userInfo.uid)
            .collection('cartProducts')
            .doc('cartList')
            .update({
              productIds: productIds
            });
          console.log('Updated Firebase with productIds:', productIds);
          setCartProductIds(productIds);
          const cartProducts = productList.filter(product => productIds.includes(product.id));
          setOrderedProducts(cartProducts);
        }
        setCartProductIds(productIds);
        const favoriteProducts = productList.filter(product => productIds.includes(product.id));
        setOrderedProducts(favoriteProducts)
      } else {
        console.log('No such document!');
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
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

  const removePromoCode = () => {
    setPromoCodeValue('');
    setOriginalPromoCodes(data.promoCards);
  }

  const increaseProductQuantity = async (item) => {
    const userDocId = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid).id;

    const docRef = doc(db, `users/${userDocId}/cartProducts/cartList`);
    

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const cartProducts = docSnap.data().productsInCart || [];
        const index = cartProducts.findIndex(product => product.id === item.id);
        
        if(index !== -1) {
          cartProducts[index].productQuantity += 1;
          await updateDoc(docRef, {
            productsInCart: cartProducts
          })
        }
        else {
          console.log('Product not found in cart');
        }
      }
      else {
        console.log('Cart document does not exist');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const decreaseProductQuantity = async (item) => {
    console.log('decreaseProductQuantity: ',item)
  };

  const calculateTotalAmount = () => {
    if (!orderedProducts || orderedProducts.length === 0) {
      return 0;
    };

    let total = 0;
    orderedProducts.forEach((product) => {
      if(appliedDiscount && selectedPromoCode.length > 0) {
        total += (product.price * product.productQuantity) - (product.price * (appliedDiscount / 100));
        setTotalAmount(total.toFixed(2))
      }else {
        total += product.price * product.productQuantity;
        setTotalAmount(total.toFixed(2))
      }
    })
  }

  const renderProducts = ({ item }) => {
    return (
      <>
        <ProductCardMain
          activeOpacity={1}
          productHorizontal
          productTitle={item?.title}
          brandName={item?.brand}
          showRatings={true}
          ratingsCounts={item?.rating}
          ratings={item?.rating}
          originalPrice={item?.price}
          productImage={item?.images[0]}
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
              <TouchableOpacity onPress={() => handleAddToFavorites(item)} activeOpacity={0.6} style={[styles.cartOptionItem(), styles.cartOptionItemBorder()]}>
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

  useEffect(() => {
    calculateTotalAmount();
  }, [orderedProducts, appliedDiscount,selectedPromoCode]);

  useFocusEffect(
    useCallback(() => {
      const fetchAndCalculateTotal = async () => {
        await fetchCartProduct();
        calculateTotalAmount();
      };

      fetchAndCalculateTotal();
    }, [])
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  useEffect(() => {
    return () => {
      opacityAnim.stopAnimation(); // Ensure animation stops on unmount
    };
  }, []);

  return (
    <Screen loading={loading}>
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
      <Screen withScroll bgColor={color.primary} translucent={true} style={styles.mainView()}>
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
                      keyExtractor={(item) => item?.id?.toString() + item?.title ?? Math.random().toString()}
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
                onPress={() => navigation.navigate('checkoutScreen', { orderTotal: totalAmount, cartList: orderedProducts })}
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
              <TouchableOpacity onPress={removePromoCode} activeOpacity={0.7} style={styles.forwardButton()}>
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
    </Screen>
  )
}