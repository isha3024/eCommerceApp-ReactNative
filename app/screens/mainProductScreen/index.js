import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Image, TouchableOpacity, FlatList, ToastAndroid, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, StarRatings, Text } from '../../components';
import { IcBackArrow, IcFilledHeart, IcHeart, IcShare, color, size } from '../../theme';
import { useMainContext } from '../../contexts/MainContext';
import { addToCart, toggleFavorite } from '../../redux';
import * as styles from './styles'


// const productDetail = productData.productList;
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colorsList = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'];

export const MainProductScreen = ({ route }) => {

  const navigation = useNavigation()
  const { cartProductList, setCartProductList } = useMainContext();
  const productId = route.params.productId;
  const selectedSize = route.params.selectedSize;
  const productList = useSelector((state) => state.product.products); 
  const dispatch = useDispatch();
  const selectedProduct = productList.find(product => product.id === productId);
  const favoriteProduct = selectedProduct.isFavorite;

  const [isSizeBottomSheetVisible, setIsSizeBottomSheetVisible] = useState(false);
  const [isColorBottomSheetVisible, setIsColorBottomSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(selectedSize);
  const [userColorSelected, setUserColorSelected] = useState(null)


  const onAddToFavorite = () => {
    dispatch(toggleFavorite(selectedProduct.id));
    const message = selectedProduct.isFavorite
    ? `${selectedProduct.name} removed from favorites`
    : `${selectedProduct.name} added to favorites`;
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  const toggleColors = (color) => {
    setUserColorSelected(color)
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

  const handleAddToCartBtn = (item) => {
    if (userColorSelected === null) {
      Alert.alert(
        'Error',
        'Please select color',
        [{ text: 'OK', onPress: () => null }]
      );
      return;
    }

    const productExists = cartProductList.some(cartItem => {
      return cartItem.id === item.id 
      && cartItem.color === userColorSelected
      && cartItem.size === userSizeOption
    });

    if(productExists){
      ToastAndroid.show('Product already exists', ToastAndroid.SHORT)
      return
    }
    
    setCartProductList((prevList) => {
      return [...prevList, { ...item, productColor: userColorSelected, size: userSizeOption}]
    });
    
    ToastAndroid.show(`${item.name} added to cart`, ToastAndroid.SHORT);
  };
  

  const handleRatingsReviews = () => {
    navigation.navigate('ratingsReviewsScreen', { productReview: selectedProduct.ratings })
  }

  return (
    <>
      <View style={styles.topView()}>
        <Header
          title={true}
          headerStyle={styles.header()}
          headerTitle={selectedProduct.name}
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
      <Screen withScroll bgColor={color.white} translucent={true}>
        <View style={styles.mainProduct()}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            contentContainerStyle={styles.scrollImageView()}>
            <Image style={styles.mainProductImage()} source={selectedProduct?.mainProductImageOne} />
            <Image style={styles.mainProductImage()} source={selectedProduct?.mainProductImageTwo} />
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
            <TouchableOpacity style={[styles.addToFavorite()]} onPress={onAddToFavorite}>
              {
                favoriteProduct ?
                  (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
                  : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
              }
            </TouchableOpacity>
          </View>
          <View style={styles.productInfo()}>
            <View style={styles.productBrandPrice()}>
              <Text style={styles.productBrand()}>{selectedProduct.brand}</Text>
              <Text style={styles.productPrice()}>${selectedProduct.originalPrice}</Text>
            </View>
            <Text style={styles.productTitle()}>{selectedProduct.name}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleRatingsReviews}>
              <StarRatings ratings={selectedProduct.ratings} ratingsCounts={selectedProduct.rating_count} customStarRatingStyle={styles.starRatings()} />
            </TouchableOpacity>
            <Text style={styles.productDescription()}>{selectedProduct.description}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.productDetails()}>
            <Text style={styles.productDetailText()}>Item details</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.productDetails()}>
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
            <Text style={styles.relatedProductsItems()}>12 items</Text>
          </View>
          <View>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingBottom: size.moderateScale(80) }}
              data={productList}
              renderItem={({item}) => {
                return (
                  <ProductCardMain
                    onProductPress={() => navigation.navigate('mainProductScreen', { productId: item.id })}
                    customProductStyle={styles.productCardHome()}
                    productImage={item?.images}
                    brandName={item?.brand}
                    productTitle={item?.name}
                    originalPrice={item?.originalPrice}
                    sellingPrice={item?.sellingPrice}
                    ratings={item.ratings}
                    ratingsCounts={item.rating_count}
                    newProduct={item?.isProductNew}
                  />
                )
              }}
              keyExtractor={(item, index) => item + index}
            />
          </View>
        </View>

        {/* Bottom Sheet Containers */}
      </Screen>
      <View style={styles.bottomView()}>
        <Button title='ADD TO CART' onPress={() => handleAddToCartBtn(selectedProduct)} />
      </View>
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
                <TouchableOpacity onPress={() => toggleColors(color)} activeOpacity={0.7} style={[styles.colorItem(),  userColorSelected === color && styles.colorItemActive()]} key={color}>
                  <View style={styles.colors(color)}></View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {/* <Button title='ADD TO CART' btnStyle={styles.button()} /> */}
      </BottomSheetContainer>
    </>
  )
}
