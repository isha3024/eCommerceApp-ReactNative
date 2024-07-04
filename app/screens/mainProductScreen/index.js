import React, { useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as productData from '../../json';
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, StarRatings, Text } from '../../components';
import { IcBackArrow, IcFilledHeart, IcHeart, IcShare, color, size } from '../../theme';
import * as styles from './styles'
import { useNavigation } from '@react-navigation/native';


const productDetail = productData.productList;
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colorsList = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'];

export const MainProductScreen = ({ route }) => {

  const productId = route.params.productId;
  const selectedSize = route.params.selectedSize;
  const selectedProduct = productDetail.find(product => product.id === productId);

  const navigation = useNavigation()
  const [filledHeart, setFilledHeart] = useState(false);
  const [isSizeBottomSheetVisible, setIsSizeBottomSheetVisible] = useState(false);
  const [isColorBottomSheetVisible, setIsColorBottomSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(selectedSize);
  const [selectColors, setSelectColors] = useState([]);

  const onAddToFavorite = () => {
    if (filledHeart) {
      setFilledHeart(false)
    } else {
      setFilledHeart(true)
    }
  }

  const toggleColors = (color) => {
    if (selectColors.includes(color)) {
      setSelectColors(selectColors.filter(col => col !== color));
    } else {
      setSelectColors([...selectColors, color]);
    }
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
            <Image source={selectedProduct?.mainProductImageOne} />
            <Image source={selectedProduct?.mainProductImageTwo} />
          </ScrollView>
          <View style={styles.productOptions()}>
            <TouchableOpacity onPress={handleSizeDropdownPress} activeOpacity={0.5} style={styles.productDropdown()}>
              <Text style={styles.productOptionText()}>Size</Text>
              <IcBackArrow style={styles.dropDownArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleColorDropdownPress} activeOpacity={0.5} style={styles.productDropdown()}>
              <Text style={styles.productOptionText()}>Color</Text>
              <IcBackArrow style={styles.dropDownArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addToFavorite()]} onPress={onAddToFavorite}>
              {
                filledHeart ?
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
            <TouchableOpacity onPress={handleRatingsReviews}>
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
              data={productDetail}
              renderItem={(item) => {
                return (
                  <ProductCardMain
                    customProductStyle={styles.productCardHome()}
                    productImage={item.item.images}
                    brandName={item.item.brand}
                    productTitle={item.item.name}
                    originalPrice={item.item?.originalPrice}
                    sellingPrice={item.item?.sellingPrice}
                    ratings={item.item.ratings}
                    ratingsCounts={item.item.rating_count}
                    newProduct={item.item?.isProductNew}
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
        <Button title='ADD TO CART' />
      </View>
      <BottomSheetContainer
        isVisible={isSizeBottomSheetVisible}
        onClose={handleSizeDropdownPressClose}
        customHeight={'40%'}>
        <Text style={styles.bottomSheetTitle()}>Select Size</Text>
        <View style={styles.bottomSheetContainer()}>
          {
            sizes.map((size, index) => {
              const isSelected = size === userSizeOption;
              return (
                <TouchableOpacity onPress={() => selectSizeHandler(size)} activeOpacity={0.5} style={[styles.sizeItem(), isSelected && styles.sizeItemActive()]} key={index}>
                  <Text style={[styles.sizeText(), isSelected && styles.sizeTextActive()]}>{size}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <TouchableOpacity style={styles.sizeInfo()}>
          <Text style={styles.sizeInfoText()}>Size info</Text>
          <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        <Button title='ADD TO CART' btnStyle={styles.button()} />
      </BottomSheetContainer>
      <BottomSheetContainer
        isVisible={isColorBottomSheetVisible}
        onClose={handleColorDropdownPressClose}
        customHeight={'35%'}>
        <Text style={styles.bottomSheetTitle()}>Select Color</Text>
        <View style={styles.bottomSheetContainer()}>
          {
            colorsList.map((color) => {
              return (
                <TouchableOpacity onPress={() => toggleColors(color)} activeOpacity={0.7} style={[styles.colorItem(), selectColors.includes(color) && styles.colorItemActive()]} key={color}>
                  <View style={styles.colors(color)}></View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <Button title='ADD TO CART' btnStyle={styles.button()} />
      </BottomSheetContainer>
    </>
  )
}
