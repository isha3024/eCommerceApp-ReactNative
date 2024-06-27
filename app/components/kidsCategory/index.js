import React from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { images } from '../../theme'
import { Text } from '../text'

const kidsData = [
  {
    categoryName: 'Accessories',
    categoryImg: images.imgAccessoriesCategory ,  
  },
  {
    categoryName: 'Shoes',
    categoryImg: images.imgShoesCategory ,
  },
  {
    categoryName: 'Clothes',
    categoryImg: images.imgClothesCategory ,
  },
  {
    categoryName: 'New',
    categoryImg: images.imgNewCategory ,     
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

export const KidsCategories = () => {

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

  return (
    <View style={styles.categoriesSection()}>
      <TouchableOpacity activeOpacity={0.5} style={styles.summerSale()}>
          <Text style={styles.title()}>SUMMER SALE</Text>
          <Text style={styles.text()}>Up to 50% off</Text>
        </TouchableOpacity>
        <View style={styles.selectedCategoriesList()}>
          <FlatList 
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height:200}}
            data={kidsData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.categoryName}
            contentContainerStyle={styles.flatList()}
          />
        </View>
    </View>
  )
}
