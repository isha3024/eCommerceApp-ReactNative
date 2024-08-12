import React, { useCallback, useEffect, useState } from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, BackHandler, Alert, ToastAndroid, StatusBar } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import { useMainContext } from '../../contexts/MainContext'
import { BottomSheetContainer, Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { color, IcBackArrow, images, size } from '../../theme'
import * as styles from './styles'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const HomeScreen = () => {

  const navigation = useNavigation();
  const { allProducts, setAllProducts, saveProducts, fetchProducts } = useMainContext();

  const [products, setProducts] = useState([]);
  const [isSizeBottomSheetVisible, setSizeBottomSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClosePressSizeSheet = () => {
    setUserSizeOption(false)
    setSizeBottomSheetVisible(false);
  }

  const selectSizeHandler = (size) => {
    size === userSizeOption ? setUserSizeOption(false) : setUserSizeOption(size)
  };

  const handleFavoriteBtn = async (item) => {
    const updatedProducts = products.map((product) => {
      if (product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        }
      }
      return product
    })
    setProducts(updatedProducts);

    const updateAllProducts = allProducts.map((product) => {
      if(product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite
        }
      }
      return product;
    })
    setAllProducts(updateAllProducts);
    saveProducts(updateAllProducts);

    const message = item.isFavorite 
    ? `${item.name} removed from favs`
    : `${item.name} added to favs` 
    ToastAndroid.show(message, ToastAndroid.SHORT)
  };

  const handleProductPress = (item) => {
    setSelectedProductId(item.id)
    setSizeBottomSheetVisible(true);
  }

  const handleMainProductScreen = () => {
    if(userSizeOption === false) {
      ToastAndroid.show('Please Select Size', ToastAndroid.SHORT)
      return
    }
    navigation.navigate('mainProductScreen', {selectedSize: userSizeOption, productId: selectedProductId})
    setUserSizeOption(false)
    setSizeBottomSheetVisible(false);
  }

  const renderProducts = ({ item }) => {
    return (
      <ProductCardMain
        onProductPress={() => handleProductPress(item)}
        customProductStyle={styles.productCardHome()}
        productImage={item?.images}
        brandName={item?.brand}
        productTitle={item?.name}
        originalPrice={item?.originalPrice}
        ratings={item?.ratings}
        ratingsCounts={item?.rating_count}
        newProduct={item?.isProductNew}
        addToFavoriteIcon
        onAddToFavorite={() => handleFavoriteBtn(item)}
        isProductFavorite={item?.isFavorite}
        flotingBtnStyle={styles.flotingBtnStyle()}
      />
    )
  }

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'Cancel',onPress: () => null},
            {text: 'Exit',onPress: () => BackHandler.exitApp()}
          ]
        )
        return true;
      }

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    })
  )

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(color.transparent)
    },[allProducts])
  )

  useEffect(() => {
    StatusBar.setBackgroundColor(color.transparent)
  },[allProducts])

  useEffect(() => {
    const newProducts = allProducts.filter(product => product.isProductNew);
    setProducts(newProducts);
  }, [allProducts]);


  return (
    <>
    <Screen withScroll bgColor={color.transparent} translucent={true}>
      <View style={styles.topView()}>
          <ImageBackground source={images.ImgBanner} style={styles.imageBg()}>
            <LinearGradient
              colors={['rgba(0, 0, 0, .7)', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0, y: 1 }}
              locations={[0.2, 0.5]}
              end={{ x: 0, y: 0 }} style={styles.linearGradient()}>
              <View style={styles.imageOverlayText()}>
                <Title title='Fashion sale' style={styles.title()} />
                <Button
                  activeOpacity={0.9}
                  title='Check'
                  btnStyle={styles.buttonTop()}
                  onPress={() => navigation.navigate('shopStackNavigation')}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.bottomTabView()}>
          <View style={styles.productListHorizontalTop()}>
            <View>
              <Title title='New' />
              <Text style={styles.textLight()}>You've never seen it before!</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('shopStackNavigation')}>
              <Text style={styles.link()}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingBottom: size.moderateScale(80) }}
            data={products}
            renderItem={renderProducts}
            keyExtractor={(item, index) => item + index}
          />
        </View>
    </Screen>
    <BottomSheetContainer
        isVisible={isSizeBottomSheetVisible}
        onClose={handleClosePressSizeSheet}
        customHeight={'47%'}>
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
        <Button activeOpacity={0.8} title='ADD TO CART' onPress={() => handleMainProductScreen()} btnStyle={styles.button()} />
      </BottomSheetContainer>
    </>
  )
}