import React, { useCallback, useState } from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { BottomSheetContainer, Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { color, IcBackArrow, images, size } from '../../theme'

import * as styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const data = [
  {
    name: "Evening Dress",
    brand: "Dorothy Perkins",
    images: images.ImgCard,
    rating: 5,
    rating_scale: 10.0,
    rating_count: 12,
    originalPrice: 17.99,
    isProductNew: true
  },
  {
    name: "Dorothi Perkins",
    merchant: "Sports Dress",
    brand: "Shoemaster",
    description: "Brilliant, colorful shoes made from recycled materials.",
    images: images.ImgCard,
    rating: 4,
    rating_scale: 10.0,
    rating_count: 4,
    originalPrice: 22,
    sellingPrice: 11,
    isProductNew: false
  },
  {
    name: "Sport Dress",
    merchant: "Example Store",
    brand: "Sitlly",
    description: "Brilliant, colorful shoes made from recycled materials.",
    images: images.ImgCard,
    rating: 1,
    rating_scale: 10.0,
    rating_count: 22,
    originalPrice: 14,
    isProductNew: false
  },
  {
    name: "Dinner Dress",
    merchant: "Example Store",
    brand: "Puma",
    images: images.ImgCard,
    rating: 2,
    rating_scale: 10.0,
    rating_count: 12,
    originalPrice: 17,
    isProductNew: true
  },
  {
    name: "Shorts",
    merchant: "Example Store",
    brand: "H&M",
    images: images.ImgCard,
    rating: 4,
    rating_scale: 10.0,
    rating_count: 12,
    originalPrice: 30,
    sellingPrice: 20.76,
    isProductNew: false
  }
]
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export const HomeScreen = () => {
  const navigation = useNavigation();  
  const [isSizeBottomSheetVisible, setSizeBottomSheetVisible] = useState(false);

   //showing the user selected size option
   const [userSizeOption, setUserSizeOption] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClosePressSizeSheet = () => {
    setSizeBottomSheetVisible(false);
  }

  const selectSizeHandler = (size) => {
    setUserSizeOption(size);
    if (selectedProductId) {
      // navigation.navigate('mainProductScreen', { selectedSize: size, productId: selectedProductId });
      setUserSizeOption('')
    }
  };

  const handleFavoriteBtn = () => {
    if(userSizeOption.length !== 0){
      setSizeBottomSheetVisible(true);
      navigation.navigate('favoriteScreen', {selectedSize: userSizeOption, selectedId: selectedProductId})
      setUserSizeOption(false)
      setSizeBottomSheetVisible(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(color.transparent);
      StatusBar.setTranslucent(true);
    }, [])
  );


  return (
    <Screen withScroll>
      <StatusBar backgroundColor={color.transparent} translucent={true}/>
    <View>
    <View style={styles.topView()}>
        <ImageBackground source={images.ImgBanner} style={styles.imageBg()}>
        <LinearGradient 
          colors={['rgba(0, 0, 0, .7)', 'rgba(255, 255, 255, 0)']} 
          start={{x: 0, y: 1}} 
          locations={[0.2, 0.5]}
          end={{x: 0, y: 0}} style={styles.linearGradient()}>
          <View style={styles.imageOverlayText()}>
            <Title title='Fashion sale' style={styles.title()} />
            <Button title='Check' btnStyle={styles.buttonTop()} />
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
        <TouchableOpacity>
            <Text style={styles.link()}>View all</Text>
        </TouchableOpacity>
        </View>
        <FlatList 
          horizontal
          contentContainerStyle={{paddingBottom: size.moderateScale(80)}}
          data={data}
          renderItem={(item) => {
            return (
              <ProductCardMain 
                onProductPress={() => {
                  setSelectedProductId(item.id);
                  setSizeBottomSheetVisible(true);
                }}
                customProductStyle={styles.productCardHome()}
                productImage={item.item.images}
                brandName={item.item.brand}
                productTitle={item.item.name}
                originalPrice={item.item?.originalPrice}
                sellingPrice={item.item?.sellingPrice} 
                ratings={item.item.rating}
                ratingsCounts={item.item.rating_count}
                newProduct={item.item?.isProductNew}
              />
            )
          }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </View>   
    <BottomSheetContainer
      isVisible={isSizeBottomSheetVisible}
      onClose={handleClosePressSizeSheet}
      customHeight={'45%'}>
      <Text style={styles.titleBottomSheet()}>Select Size</Text>
      <View style={styles.sizeContainer()}>
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
      <Button title='ADD TO FAVORITE' onPress={handleFavoriteBtn} btnStyle={styles.button()} />
    </BottomSheetContainer>
    </Screen>
  )
}