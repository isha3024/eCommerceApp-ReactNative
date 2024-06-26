import React, { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Header, Screen, Text } from '../../components'
import { IcBackArrow, IcSearch, color, images, size } from '../../theme'

import * as styles from './styles'

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
  const [categoryTab, setCategoryTab] = useState(['women', 'men', 'kids']);
  const [selectedCategory, setSelectedCategory] = useState(categoryTab);

  useEffect(() => {
    setSelectedCategory('women')
  }, [])
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
      <View style={styles.categoriesSection()}>
        <TouchableOpacity activeOpacity={0.5} style={styles.summerSale()}>
          <Text style={styles.title()}>SUMMER SALE</Text>
          <Text style={styles.text()}>Up to 50% off</Text>
        </TouchableOpacity>
        <View style={styles.selectedCategoriesList()}>
          {selectedCategory === 'women' && 
            <FlatList
              data={womenData}
              keyExtractor={item => item.categoryName}
              renderItem={({item, index}) => {
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
              }} 
             />
          }
          {selectedCategory === 'men' && 
            <FlatList
              data={menData}
              keyExtractor={item => item.categoryName}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity style={styles.categoryItem()}>
                    <Text style={styles.categoryItemName()}>{item.categoryName}</Text>
                    <Image
                      style={styles.categoryItemImg()}
                      source={item.categoryImg}
                    />
                  </TouchableOpacity>
                )
              }} 
              contentContainerStyle={{
                flexGrow: 1,
              }}
             />}
          {selectedCategory === 'kids' && 
            <FlatList
              data={kidsData}
              keyExtractor={item => item.categoryName}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity style={styles.categoryItem()}>
                    <Text style={styles.categoryItemName()}>{item.categoryName}</Text>
                    <Image
                      style={styles.categoryItemImg()}
                      source={item.categoryImg}
                    />
                  </TouchableOpacity>
                )
              }} 
             />}
        </View>
      </View>
     
    </Screen>
  )
}
