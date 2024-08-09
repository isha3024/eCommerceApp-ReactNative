import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'

import { Text } from '../text'
import { images } from '../../theme'
import * as styles from './styles'

const menData = [
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

export const MenCategories = () => {

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.categoryItem()}>
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
      <TouchableOpacity activeOpacity={0.9} style={styles.summerSale()}>
          <Text style={styles.title()}>SUMMER SALE</Text>
          <Text style={styles.text()}>Up to 50% off</Text>
        </TouchableOpacity>
        <View style={styles.selectedCategoriesList()}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height:210}}
            data={menData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.categoryName}
            contentContainerStyle={styles.flatList()}
          />
        </View>
    </View>
  )
}
