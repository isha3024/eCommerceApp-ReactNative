import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, FlatList, ToastAndroid, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, StarRatings, Text } from '../../components';
import { IcBackArrow, IcFilledHeart, IcHeart, IcShare, color, size } from '../../theme';
import { useMainContext } from '../../contexts/MainContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, toggleFavorite, updateFavorites } from '../../redux';
import * as styles from './styles'


// const productDetail = productData.productList;
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colorsList = [
  {
    color: '#020202',
    name: 'Black',
  },
  {
    color: '#F6F6F6',
    name: 'White',
  },
  {
    color: '#B82222',
    name: 'Red',
  },
  {
    color: '#BEA9A9',
    name: 'Gray',
  },
  {
    color: '#E2BB8D',
    name: 'Cream',
  },
  {
    color: '#151867',
    name: 'Blue',
  }
]

export const MainProductScreen = ({ route }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { cartProductList, setCartProductList } = useMainContext();
  const { userInfo } = useSelector(state => state.authUser)
  const productId = route.params.productId;
  const selectedSize = route.params.selectedSize;

  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [showRelatedProducts, setShowRelatedProducts] = useState([]);
  // console.log('productDetail', productDetail)
  const [isSizeBottomSheetVisible, setIsSizeBottomSheetVisible] = useState(false);
  const [isColorBottomSheetVisible, setIsColorBottomSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(selectedSize);
  // console.log(userSizeOption)
  const [userColorSelected, setUserColorSelected] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const productsSnapshot = await firestore().collection('products').get();
      const productList = productsSnapshot.docs.map(doc => {
        return doc.data();
      });

      const mainProduct = productList.filter(product => product.id === productId) || [0];
      setProductDetail(mainProduct[0] || {});

      const showRelatedProductList = productList.filter(product => product.category === mainProduct[0].category).filter(product => product.id !== mainProduct[0].id);
      setShowRelatedProducts(showRelatedProductList)

      const userFavoriteRef = firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList');
      const userFavoriteSnapshot = await userFavoriteRef.get();
      const favoriteProductIds = userFavoriteSnapshot.exists ? (userFavoriteSnapshot.data().productIds || []) : [];

      const isFavorite = favoriteProductIds.includes(productId);
      setProductDetail(prevState => ({
        ...prevState,
        isFavorite: isFavorite,
      }))
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const mainProductAddToFavorite = async (item) => {
    const userFavoriteRef = firebase.firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList')

    try {
      const doc = await userFavoriteRef.get();
      let favoriteProducts = doc.exists ? (doc.data().productIds || []) : [];

      if (favoriteProducts.includes(item.id)) {
        favoriteProducts = favoriteProducts.filter(id => id !== item.id);
        await userFavoriteRef.update({ productIds: favoriteProducts });
        ToastAndroid.show(`${item.title} removed from Favorites`, ToastAndroid.SHORT);
      } else {
        favoriteProducts.push(item.id);
        await userFavoriteRef.set({ productIds: favoriteProducts });
        ToastAndroid.show(`${item.title} added to Favorites`, ToastAndroid.SHORT);
      }

      setProductDetail(prevState => ({
        ...prevState,
        isFavorite: !prevState.isFavorite
      }));
    }
    catch (error) {
      console.log('Error:', error);
    }
  }

  const addRelatedProductToFavorite = async (item) => {
    const userFavoriteRef = firebase.firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList')

    try {
      const doc = await userFavoriteRef.get();
      let favoriteProducts = doc.exists ? (doc.data().productIds || []) : [];

      if (favoriteProducts.includes(item.id)) {
        favoriteProducts = favoriteProducts.filter(id => id !== item.id);
        await userFavoriteRef.update({ productIds: favoriteProducts });
        ToastAndroid.show(`${item.title} removed from Favorites`, ToastAndroid.SHORT);
      } else {
        favoriteProducts.push(item.id);
        await userFavoriteRef.set({ productIds: favoriteProducts });
        ToastAndroid.show(`${item.title} added to Favorites`, ToastAndroid.SHORT);
      }

      dispatch(toggleFavorite(item.id));
      dispatch(updateFavorites(favoriteProducts));
    }
    catch (error) {
      console.log('Error:', error);
    }
  }

  const handleAddToCartBtn = async (item) => {
    // console.log('mainItem: ', item)
    if (userColorSelected === '' || userSizeOption == undefined) {
      Alert.alert(
        'Error',
        'Please select color and size',
        [{ text: 'OK', onPress: () => null }]
      );
      return;
    }
    
    const userCartRef = firebase.firestore().collection('users').doc(userInfo.uid)
    .collection('cartProducts')
    .doc('cartList');

    try {
      const doc = await userCartRef.get();
      let productsInCart = [];

      if(doc.exists) {
        const data = doc.data();
        productsInCart = data.productsInCart || [];
      }

      const updateCartProducts = [
        ...productsInCart,
        {
          id: item.id,
          productQuantity: 1,
          selectedSize: selectedSize,
          userColorSelected: userColorSelected
        }
      ];

      await userCartRef.set({
        productsInCart: updateCartProducts
      }, {merge: true})      
    }
    catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  const handleRelatedProductPress = (item) => {
    navigation.push('mainProductScreen', { productId: item.id })
  }

  const toggleColors = (colorName) => {
    setUserColorSelected(colorName)
  }

  const handleSizeDropdownPress = () => {
    setIsSizeBottomSheetVisible(true);
  }

  const handleSizeDropdownPressClose = () => {
    setIsSizeBottomSheetVisible(false)
  }

  const handleColorDropdownPress = () => {
    setIsColorBottomSheetVisible(true);
  }

  const handleColorDropdownPressClose = () => {
    setIsColorBottomSheetVisible(false)
  }

  const selectSizeHandler = (size) => {
    setUserSizeOption(size);
  }

  // const handleAddToCartBtn = async (item) => {
  //   if (userColorSelected === '') {
  //     Alert.alert(
  //       'Error',
  //       'Please select color',
  //       [{ text: 'OK', onPress: () => null }]
  //     );
  //     return;
  //   }

  //   if(userSizeOption == undefined) {
  //     Alert.alert(
  //       'Error',
  //       'Please select size',
  //       [{ text: 'OK', onPress: () => null }]
  //     );
  //     return;
  //   }

  //   const productExists = cartProductList.some(cartItem => {
  //     return cartItem.id === item.id
  //       && cartItem.color === userColorSelected
  //       && cartItem.size === userSizeOption
  //   });

  //   if (productExists) {
  //     ToastAndroid.show('Product already exists', ToastAndroid.SHORT)
  //     return
  //   }

  //   const updatedCartList = [...cartProductList, {
  //     ...item,
  //     productColor: userColorSelected,
  //     size: userSizeOption,
  //     productQuantity: 1,
  //     stocks: item.stocks - 1
  //   }]

  //   setCartProductList(updatedCartList);

  //   try {
  //     await AsyncStorage.setItem('cartList', JSON.stringify(updatedCartList))
  //     ToastAndroid.show(`${item.name} added to cart`, ToastAndroid.SHORT);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRatingsReviews = (productReview) => {
    navigation.navigate('ratingsReviewsScreen', { productReview: productReview })
  }

  const showShippingDetails = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    const favoriteRef = firebase.firestore().collection('users').doc(userInfo.uid)
    .collection('favoriteProducts')
    .doc('favoritesList');
    setLoading(true)
    const unsuscribe = favoriteRef.onSnapshot(async (doc) => {
      if(doc.exists) {
        const { productIds } = doc.data();
        if(productIds.length > 0) {
          const productsQuery = firebase.firestore().collection('products').where('id', 'in', productIds);
          const productSnapshot = await productsQuery.get();
          const products = productSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setLoading(false)
        } else {
          // setProducts([]);
          setLoading(false)
        }
      }
    });
    setLoading(false)

    return () => unsuscribe();
  }, [userInfo.uid, productDetail])

  return (
    <Screen loading={loading}>
      <View style={styles.topView()}>
        <Header
          title={true}
          headerStyle={styles.header()}
          headerTitle={productDetail.title}
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
          headerRightIcon
          rightIcon={() => {
            return <IcShare />
          }}
        />
      </View>
      <Screen withScroll bgColor={color.white} translucent={true} loading={loading}>
        <View style={styles.mainProduct()}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            contentContainerStyle={styles.scrollImageView()}>
            {
              loading
                ? (
                  <Text>Loading...</Text>
                ) : productDetail.images && productDetail.images.length > 0
                  ? (
                    productDetail.images.map((imageUri, index) => (
                      <Image
                        key={index}
                        style={styles.mainProductImage()}
                        source={{ uri: imageUri }}
                      />
                    ))
                  )
                  : (<Text>No images available</Text>)}
          </ScrollView>
          <View style={styles.productOptions()}>
            <TouchableOpacity onPress={handleSizeDropdownPress} activeOpacity={0.5} style={styles.productDropdown(userSizeOption)}>
              <Text style={styles.productOptionText()}>Size</Text>
              <IcBackArrow style={styles.dropDownArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleColorDropdownPress} activeOpacity={0.5} style={styles.productDropdown(userColorSelected)}>
              <Text style={styles.productOptionText()}>Color</Text>
              <IcBackArrow style={styles.dropDownArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addToFavorite()]} onPress={() => mainProductAddToFavorite(productDetail)}>
              {
                productDetail.isFavorite ?
                  (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
                  : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
              }
            </TouchableOpacity>
          </View>
          <View style={styles.productInfo()}>
            <View style={styles.productBrandPrice()}>
              <Text style={styles.productBrand()}>{productDetail.brand}</Text>
              <Text style={styles.productPrice()}>${productDetail.price}</Text>
            </View>
            <Text style={styles.productTitle()}>{productDetail.title}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleRatingsReviews(productDetail)}>
              {/* <StarRatings ratings={productDetail.rating} ratingsCounts={productDetail.rating} customStarRatingStyle={styles.starRatings()} /> */}
              <StarRatings customStarRatings={styles.starRatings()} ratings={productDetail?.rating} ratingsCounts={productDetail?.rating} />
            </TouchableOpacity>
            <Text style={styles.productDescription()}>{productDetail.description}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.productDetails()}>
            <Text style={styles.productDetailText()}>Item details</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showShippingDetails(productDetail.shippingInformation)} activeOpacity={0.5} style={styles.productDetails()}>
            <Text style={styles.productDetailText()}>Shipping Info</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={[styles.productDetails(), styles.productDetailsLastItem()]}>
            <Text style={styles.productDetailText()}>Support</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
        </View>
        <View style={styles.relatedProducts()}>
          <View style={styles.relatedProductsHeading()}>
            <Text style={styles.relatedProductsTitle()}>You can also like this</Text>
            <Text style={styles.relatedProductsItems()}>{showRelatedProducts.length} items</Text>
          </View>
          <View>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingBottom: size.moderateScale(80), gap: size.moderateScale(10) }}
              data={showRelatedProducts}
              renderItem={({ item }) => {
                const itemTitle = item?.title.length > 15 ? item?.title.substring(0, 13) + '...' : item?.title
                return (
                  <ProductCardMain
                    onProductPress={() => handleRelatedProductPress(item)}
                    productTitle={itemTitle}
                    brandName={item?.brand}
                    showRatings={true}
                    showRatingHorizontal={true}
                    productImage={item?.images[0]}
                    originalPrice={item?.price}
                    sellingPrice={item?.sellingPrice}
                    showDiscount={true}
                    ratings={item?.rating}
                    addToFavoriteIcon={true}
                    flotingBtnStyle={styles.flotingBtnStyle()}
                    onAddToFavorite={addRelatedProductToFavorite}
                  />
                )
              }}
              keyExtractor={(item, index) => item + index}
            />
          </View>
        </View>
      </Screen>
      {
        !loading && (
          <View style={styles.bottomView()}>
            <Button
              title={productDetail.stock > 0 ? 'ADD TO CART' : 'SOLD OUT'}
              disabled={productDetail.stock > 0 ? false : true}
              onPress={() => handleAddToCartBtn(productDetail)}
            />
          </View>
        )
      }

      {/* Bottom Sheet Containers */}
      <BottomSheetContainer
        isVisible={isSizeBottomSheetVisible}
        onClose={handleSizeDropdownPressClose}
        customHeight={'34%'}>
        <Text style={styles.titleBottomSheet()}>Select Size</Text>
        <View style={styles.sizeContainer()}>
          {
            sizes.map((size, index) => {
              const isSelected = size === userSizeOption;
              return (
                <TouchableOpacity onPress={() => selectSizeHandler(size)} activeOpacity={0.5} style={styles.sizeItem(isSelected)} key={index}>
                  <Text style={styles.sizeText(isSelected)}>{size}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <TouchableOpacity style={styles.sizeInfo()} activeOpacity={0.6}>
          <Text style={styles.sizeInfoText()}>Size info</Text>
          <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        {/* <Button activeOpacity={0.8} title='ADD TO CART' onPress={handleAddToCartBtn} btnStyle={styles.button()} /> */}
      </BottomSheetContainer>
      <BottomSheetContainer
        isVisible={isColorBottomSheetVisible}
        onClose={handleColorDropdownPressClose}
        customHeight={'20%'}>
        <Text style={styles.titleBottomSheet()}>Select Color</Text>
        <View style={styles.sizeContainer()}>
          {
            colorsList.map((color) => {
              return (
                <TouchableOpacity onPress={() => toggleColors(color.name)} activeOpacity={0.7} style={[styles.colorItem(), userColorSelected === color.name && styles.colorItemActive()]} key={color.name + color.color}>
                  <View style={styles.colors(color.color)}></View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {/* <Button title='ADD TO CART' btnStyle={styles.button()} /> */}
      </BottomSheetContainer>
    </Screen>
  )
}
