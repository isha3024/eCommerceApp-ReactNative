import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Header, Screen, Text } from '../../components'
import { IcBackArrow, IcSearch, color, images, size } from '../../theme'

import * as styles from './styles'
import axios from 'axios'

const womenData = [
  {
    categoryName: 'New',
    categoryImg: images.imgNewCategory ,     
  },
  {
    categoryName: 'Clothes',
    categoryImg: images.imgClothesCategory ,
  },
  {
    categoryName: 'Shoes',
    categoryImg: images.imgShoesCategory ,
  },
  {
    categoryName: 'Accessories',
    categoryImg: images.imgAccessoriesCategory ,  
  },
  {
    categoryName: 'Skirts',
    categoryImg: images.imgNewCategory , 
  },
  {
    categoryName: 'Shorts',
    categoryImg: images.imgNewCategory , 
  },
]
const menData = [
  {
    categoryName: 'Accessories',
    categoryImg: images.imgAccessoriesCategory ,
  },
  {
    categoryName: 'New',
    categoryImg: images.imgNewCategory ,
  },
  {
    categoryName: 'Clothes',
    categoryImg: images.imgClothesCategory ,
  },
  {
    categoryName: 'Shoes',
    categoryImg: images.imgShoesCategory ,
  },
  
  {
    categoryName: 'Sports',
    categoryImg: images.imgNewCategory ,
  },
]
const kidsData = [
  {
    categoryName: 'Shoes',
    categoryImg: images.imgShoesCategory ,
  },
  {
    categoryName: 'New',
    categoryImg: images.imgNewCategory ,
  },
  {
    categoryName: 'Clothes',
    categoryImg: images.imgClothesCategory ,
  },
  {
    categoryName: 'Accessories',
    categoryImg: images.imgAccessoriesCategory ,
  },
  {
    categoryName: 'Tops',
    categoryImg: images.imgNewCategory ,
  },
  {
    categoryName: 'Pants',
    categoryImg: images.imgNewCategory ,
  },
]


export const ShopScreen = () => {

  const [loading, setLoading] = useState(false)
  const [categoryTab, setCategoryTab] = useState(['women', 'men', 'kids']);
  const [selectedCategory, setSelectedCategory] = useState(categoryTab);

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.categoryItem()}>
        <View style={styles.categoryItemNameView()}>
         <Text style={styles.categoryItemName()}>{item.categoryName}</Text>
        </View>
        <Image
          style={styles.categoryItemImg()}
          source={item.categoryImg}
        />
      </TouchableOpacity>
    )
  }
  
  const getCategoryData = () => {
    switch(selectedCategory) {
      case 'women':
        return womenData;
      case 'men':
        return menData;
      case 'kids':
        return kidsData;
    }
  }


  useEffect(() => {
    setSelectedCategory('women')
  }, [categoryTab])


  return (
    <Screen bgColor={color.white}>
      <Header 
        headerStyle={styles.header()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow fill={color.mostlyBlack} width={size.moderateScale(10)} height={size.moderateScale(16)} />)
        }}
        title
        headerTitle='Categories'
        headerRightIcon
        rightIcon={() => {
          return (<IcSearch />)
        }}
      />
      <View style={styles.categoriesTab()}>
        {
          categoryTab.map((category, index) => {
            return (
              <TouchableOpacity onPress={() => (
                setSelectedCategory(category)
                )} activeOpacity={0.4} key={index} style={styles.categoryView(selectedCategory === category)}>
                <Text style={styles.categoryText()}>{category}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <ScrollView style={styles.categoriesSection()}>
        <TouchableOpacity activeOpacity={0.5} style={styles.summerSale()}>
          <Text style={styles.title()}>SUMMER SALE</Text>
          <Text style={styles.text()}>Up to 50% off</Text>
        </TouchableOpacity>
        <View style={styles.selectedCategoriesList()}>
          <FlatList 
            data={getCategoryData()}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.categoryName}
            contentContainerStyle={styles.flatList()}
          />
        </View>
      </ScrollView>
     
    </Screen>
  )
}
