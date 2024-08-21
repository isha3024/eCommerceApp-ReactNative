import React, { useCallback, useEffect, useState } from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, BackHandler, Alert, ToastAndroid, StatusBar, Image } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import firestore from '@react-native-firebase/firestore'

import { useMainContext } from '../../contexts/MainContext'
import { BottomSheetContainer, Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { color, IcBackArrow, images, size } from '../../theme'
import * as styles from './styles'
import { loadProducts } from '../../redux'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const HomeScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { saveFavoriteProducts } = useMainContext();

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]);
  const [isSizeBottomSheetVisible, setSizeBottomSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  //fetch Products using axios and stored in redux
  // const fetchProducts = async () => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }
  //   setLoading(true)
  //   try {
  //     const response  = await axios('https://dummyjson.com/products',options);
  //     if(response.status === 200) {
  //       const data = response.data.products;
  //       setProducts(data);
  //       dispatch(loadProducts(data))
  //     }
  //     setLoading(false)
  //   }
  //   catch (error) {
  //     console.log('error', error)
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const products = await firestore().collection('products').get();
      const productList = products.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      const filterNewProducts = productList.filter(product => product.isProductNew)
      setProducts(filterNewProducts);
      setLoading(false)
    }
    catch (error) {
      console.error('Error fetching products:', error);
        setLoading(false);
    }
    finally {
      setLoading(false);
    }
  }

  const updateImageUrls = async () => {
    try {
      const products = await firestore().collection('products').get();
      const batch = firestore().batch();

      products.docs.forEach((doc) => {
        const data = doc.data();
        if(Array.isArray(data.image)) {
          const updateImages = data.images.map(imageUrl => {
            if(imageUrl.startsWith('gs://')) {
              return imageUrl.replace('gs://', 'https://storage.googleapis.com/')
            }
            return imageUrl
          })
        }
      });

      batch.u
    }
    catch (error) {
      console.error('Error updating image URLs:', error);
    }
  }

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

    const updateAllProducts = products.map((product) => {
      if(product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite
        }
      }
      return product;
    })
    setProducts(updateAllProducts);
    
    const favoriteProducts = updateAllProducts.filter((product) => product.isFavorite === true);

    try {
      await saveFavoriteProducts(favoriteProducts);
    }
    catch (error) {
      console.log('Failed to save favorite products to AsyncStorage:', error);
    }

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
        productImage={item?.images[0]}
        brandName={item?.brand}
        productTitle={item?.title}
        originalPrice={item?.originalPrice}
        ratingsCounts={item?.ratings}
        ratings={item?.ratings}
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
    },[products])
  )

  useEffect(() => {
    StatusBar.setBackgroundColor(color.transparent)
  },[])

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
    <Screen withScroll bgColor={color.transparent} translucent={true} loading={loading}>
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
            initialNumToRender={10}
            refreshing={true}
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