import React, { useCallback, useEffect, useState } from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, StatusBar, BackHandler, Alert } from 'react-native'
import { BottomSheetContainer, Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import { color, IcBackArrow, images, size } from '../../theme'
import * as styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../redux'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];


export const HomeScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.products);
  // console.log('products: ', productList)

  const [products, setProducts] = useState([])
  const [showLoader, setShowLoader] = useState(false)
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

  const showOnlyNewProducts = () => {
    const newProducts = productList.filter(product => product.isProductNew === true);
    setProducts(newProducts)
  }

  const handleFavoriteBtn = (item) => {
    const newProductList = products.map((product) => {
      if (product.id === item.id) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });
    setProducts(newProductList)
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(color.transparent);
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content')
    },[StatusBar])
  );

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

  useEffect(() => {
    setShowLoader(true)
    setTimeout(() => {
      setShowLoader(false)
    }, 1000)
  }, [])

  useEffect(() => {
    showOnlyNewProducts()
  },[])

  useEffect(() => {
    dispatch(loadProducts())
  },[dispatch])


  return (
    <Screen withScroll loading={showLoader}>
        <StatusBar backgroundColor={color.transparent} translucent={true} />
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
            renderItem={(item) => {
              return (
                <ProductCardMain
                  onProductPress={() => {
                    setSelectedProductId(item?.id);
                    setSizeBottomSheetVisible(true);
                  }}
                  customProductStyle={styles.productCardHome()}
                  productImage={item.item?.images}
                  brandName={item.item?.brand}
                  productTitle={item.item?.name}
                  originalPrice={item.item?.originalPrice}
                  sellingPrice={item.item?.sellingPrice}
                  ratings={item.item?.ratings}
                  ratingsCounts={item.item?.rating_count}
                  newProduct={item.item?.isProductNew}
                  addToFavoriteIcon
                  onAddToFavorite={() => handleFavoriteBtn(item.item)}
                  isFavorite={item.item?.isFavorite}
                  flotingBtnStyle={styles.flotingBtnStyle()}
                />
              )
            }}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      <BottomSheetContainer
        isVisible={isSizeBottomSheetVisible}
        onClose={handleClosePressSizeSheet}
        customHeight={'43%'}>
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
        <Button activeOpacity={0.8} title='ADD TO FAVORITE' onPress={handleFavoriteBtn} btnStyle={styles.button()} />
      </BottomSheetContainer>
    </Screen>
  )
}