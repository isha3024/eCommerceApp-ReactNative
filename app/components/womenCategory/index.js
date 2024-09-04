import React, { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { Text } from '../text'
import { color, images } from '../../theme'
import * as styles from './styles'
import { Screen } from '../screen'
import { useMainContext } from '../../contexts/MainContext'

const womenData = [
  {
    categoryName: 'New',
    categoryImg: images.imgNewCategory,
  },
  {
    categoryName: 'Clothes',
    categoryImg: images.imgClothesCategory,
  },
  {
    categoryName: 'Shoes',
    categoryImg: images.imgShoesCategory,
  },
  {
    categoryName: 'Accessories',
    categoryImg: images.imgAccessoriesCategory,
  },
  {
    categoryName: 'Skirts',
    categoryImg: images.imgNewCategory,
  },
  {
    categoryName: 'Shorts',
    categoryImg: images.imgNewCategory,
  },
  {
    categoryName: 'Pants',
    categoryImg: images.imgNewCategory,
  },
  {
    categoryName: 'Tees',
    categoryImg: images.imgNewCategory,
  },
  {
    categoryName: 'Joggers',
    categoryImg: images.imgNewCategory,
  },
]

export const WomenCategories = () => {

  const navigation = useNavigation();
  const { setCategoryUrl } = useMainContext();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  const loadCategories = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    setLoading(true);
    try {
      const response = await axios('https://dummyjson.com/products/categories', options);
      if (response.status == 200) {
        const data = response.data;
        setLoading(false);
        setCategories(data);
      }
    }
    catch (error) {
      console.log('error: ', error)
      setLoading(false);
    }
  }

  const handleCategory = (item) => {
    setCategoryUrl(item);
    navigation.navigate('catalogeScreen');
  }

  useEffect(() => {
    loadCategories();
  }, [])


  const renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategory(item)} style={styles.categoryItem()}>
        <View style={styles.categoryItemNameView()}>
          <Text style={styles.categoryItemName()}>{item.name}</Text>
        </View>
        <Image
          style={styles.categoryItemImg()}
          source={images.imgNewCategory}
        />
      </TouchableOpacity>
    )
  }

  return (
    <Screen loading={loading} translucent={true} bgColor={color.primary}>
      <View style={styles.categoriesSection()}>
        <TouchableOpacity activeOpacity={0.9} style={styles.summerSale()}>
          <Text style={styles.title()}>SUMMER SALE</Text>
          <Text style={styles.text()}>Up to 50% off</Text>
        </TouchableOpacity>
        <View style={styles.selectedCategoriesList()}>
          <FlatList
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 200 }}
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={renderCategoryItem}
            key={(item, index) => index + item.name}
            keyExtractor={item => item.name}
            contentContainerStyle={styles.flatList()}
          />
        </View>
      </View>
    </Screen>
  )
}
