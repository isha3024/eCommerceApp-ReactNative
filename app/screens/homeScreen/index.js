import React, { useCallback, useEffect, useState } from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, BackHandler, Alert, ToastAndroid, StatusBar, Image } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

import { BottomSheetContainer, Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { color, IcBackArrow, images, size } from '../../theme'
import * as styles from './styles'
import { toggleFavorite, updateFavorites } from '../../redux'
import { useMainContext } from '../../contexts/MainContext'

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const HomeScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.authUser)
  const favoriteProducts = useSelector(state => state.favorites.favoriteProducts);
  
  const {setFavoriteProductIds} = useMainContext()

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
    setLoading(true);
    try {
      const productsSnapshot = await firestore().collection('products').get();
      const productList = productsSnapshot.docs.map(doc => {
        const productData = doc.data();
        return productData;
      });
  
      // Filter products if needed (e.g., by category)
      const filteredProducts = productList
      .sort((a, b) => a.title.localeCompare(b.title))
      .filter(product => product.category === 'beauty'); // Modify this filter based on your needs
  
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products in homeScreen:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClosePressSizeSheet = () => {
    setUserSizeOption(false)
    setSizeBottomSheetVisible(false);
  }

  const selectSizeHandler = (size) => {
    size === userSizeOption ? setUserSizeOption(false) : setUserSizeOption(size)
  };

  //handleFavoriteBtn using redux and asyncstorage
  // const handleFavoriteBtn = async (item) => {
  //   const updatedProducts = products.map((product) => {
  //     if (product.id === item.id) {
  //       return {
  //         ...product,
  //         isFavorite: !product.isFavorite,
  //       }
  //     }
  //     return product
  //   })
  //   setProducts(updatedProducts);

  //   const updateAllProducts = products.map((product) => {
  //     if(product.id === item.id) {
  //       return {
  //         ...product,
  //         isFavorite: !product.isFavorite
  //       }
  //     }
  //     return product;
  //   })
  //   setProducts(updateAllProducts);
    
  //   const favoriteProducts = updateAllProducts.filter((product) => product.isFavorite === true);

  //   try {
  //     await saveFavoriteProducts(favoriteProducts);
  //   }
  //   catch (error) {
  //     console.log('Failed to save favorite products to AsyncStorage:', error);
  //   }

  //   const message = item.isFavorite 
  //   ? `${item.name} removed from favs`
  //   : `${item.name} added to favs` 
  //   ToastAndroid.show(message, ToastAndroid.SHORT)
  // };

  
  const handleFavoriteBtn = async (itemId, itemName) => {
    const userFavoriteRef = firebase.firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList')

    try {
      const doc = await userFavoriteRef.get();
      let favoriteProducts = doc.exists ? (doc.data().productIds || []) : []; 

      if (favoriteProducts.includes(itemId)) {
        favoriteProducts = favoriteProducts.filter(id => id !== itemId);
        await userFavoriteRef.update({ productIds: favoriteProducts });
        ToastAndroid.show(`${itemName} removed from Favorites`, ToastAndroid.SHORT);
      } else {
        favoriteProducts.push(itemId);
        await userFavoriteRef.set({ productIds: favoriteProducts });
        ToastAndroid.show(`${itemName} added to Favorites`, ToastAndroid.SHORT);
      }
      
      setFavoriteProductIds((prevId) => 
        [...prevId, itemId]
      )
    }
    catch (error) {
      console.log('Error:', error);
    }
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
    console.log({'selectedSize': userSizeOption, 'productId': selectedProductId})
    navigation.navigate('mainProductScreen', {selectedSize: userSizeOption, productId: selectedProductId})
    setUserSizeOption(false)
    setSizeBottomSheetVisible(false);
  }

  const renderProducts = ({ item }) => {
    const itemTitle = item?.title.length > 15 ? item?.title.substring(0, 13) + '...' : item?.title;
    const isFavorite = favoriteProducts.includes(item.id);
    return (
      <ProductCardMain
        onProductPress={() => handleProductPress(item)}
        customProductStyle={styles.productCardHome()}
        productImage={item?.images[0]}
        brandName={item?.brand}
        productTitle={itemTitle}
        originalPrice={item?.price}
        showRatings={true}
        ratingsCounts={item?.rating}
        ratings={item?.rating}
        newProduct={item?.isProductNew}
        addToFavoriteIcon
        onAddToFavorite={() => handleFavoriteBtn(item.id, item.title)}
        isProductFavorite={isFavorite}
        flotingBtnStyle={styles.flotingBtnStyle()}
      />
    )
  }


  //back press handler
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
    fetchProducts();
  }, [])

  useEffect(() => {
    if(userInfo) {
      const userFavoriteRef =  firebase.firestore().collection('users').doc(userInfo.uid).collection('favoriteProducts').doc('favoritesList');

      const unsubscribe = userFavoriteRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const favorites = data.productIds || [];
          dispatch(updateFavorites(favorites))
        }
      })
      return () => unsubscribe()
    }
  }, [userInfo])


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