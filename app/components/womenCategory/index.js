import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { images } from '../../theme'
import { Text } from '../text'
import { useNavigation } from '@react-navigation/native'

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
  {
    categoryName: 'Pants',
    categoryImg: images.imgNewCategory , 
  },
  {
    categoryName: 'Tees',
    categoryImg: images.imgNewCategory , 
  },
  {
    categoryName: 'Joggers',
    categoryImg: images.imgNewCategory , 
  },
]

export const WomenCategories = () => {

  const navigation = useNavigation();
  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('catalogeScreen')} style={styles.categoryItem()}>
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
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height:200}}
            showsVerticalScrollIndicator={false}
            data={womenData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.categoryName}
            contentContainerStyle={styles.flatList()}
          />
        </View>
    </View>
  )
}
