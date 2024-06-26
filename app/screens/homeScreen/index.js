import React from 'react'
import { View, ImageBackground, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { Button, ProductCardMain, Screen, Text, Title } from '../../components'
import { color, images, size } from '../../theme'

import * as styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

const data = [
  {
    name: "Evening Dress",
    brand: "Dorothy Perkins",
    images: images.ImgCard,
    rating: 5,
    rating_scale: 10.0,
    rating_count: 12,
    regularPrice: 17.99,
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
    regularPrice: 22,
    isProductNew: true
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
    regularPrice: 14,
    isProductNew: true
  },
  {
    name: "Dinner Dress",
    merchant: "Example Store",
    brand: "Puma",
    images: images.ImgCard,
    rating: 2,
    rating_scale: 10.0,
    rating_count: 12,
    regularPrice: 17,
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
    regularPrice: 30,
    isProductNew: true
  }
]

export const HomeScreen = () => {
  return (
    <Screen withScroll bgColor={color.transparent} translucent={true}>
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
          contentContainerStyle={{paddingBottom: size.moderateScale(20)}}
          data={data}
          renderItem={(item, index) => {
            return (
              <ProductCardMain 
                productImage={item.item.images}
                brandName={item.item.brand}
                productTitle={item.item.name}
                oldPrice={item.item?.oldPrice} 
                newPrice={item.item?.salePrice}
                regularPrice={item.item?.regularPrice}
                ratings={item.item.rating}
                ratingsCounts={item.item.rating_count}
                newProduct={item.item?.isProductNew}
              />
            )
          }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </Screen>
  )
}