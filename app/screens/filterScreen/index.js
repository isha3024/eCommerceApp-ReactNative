import React, { useCallback, useState } from 'react'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import { Button, Header, Screen, Text } from '../../components'
import { IcBackArrow, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'
import PriceRange from '../../components/priceRange'
// import PriceRange from '../../components/priceRange'

const colorsList = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'];

const sizeList = ['XS', 'S', 'M', "L", 'XL']


const category = ['All', 'Women', 'Men', 'Boys', 'Girls']

export const FilterScreen = () => {
  
  const navigation = useNavigation();
  const [selectColors, setSelectColors] = useState([]);
  const [selectSize, setSelectSize] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const toggleColors = (color) => {
    setSelectColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter(col => col !== color)
        : [...prevColors, color]
    );
  }

  const toggleSizes = (size) => {
    setSelectSize((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter(s => s !== size)
        : [...prevSizes, size]
    );
  } 

  const toggleCategory = (cat) => {
    setSelectCategory((prevCategories) =>
      prevCategories.includes(cat)
        ? prevCategories.filter(c => c !== cat)
        : [...prevCategories, cat]
    );
  } 

  const applyFilters = () => {
    setTimeout(() => {
      navigation.navigate('catalogeScreen');
    },300)
  }
 
  const discardFilters = () => {
    setSelectColors([]);
    setSelectSize([]);
    setSelectCategory([]);
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
    setTimeout(() => {
      navigation.goBack()
    },300)
  }

  const handlePriceChange = useCallback((range) => {
    setMinValue(range.min);
    setMaxValue(range.max);
  },[minValue, maxValue])
  
  
  return (
    <>
        <StatusBar translucent={true} />
        <Header
          headerStyle={styles.header()}
          title
          headerTitle='Filters'
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
        />
      <Screen scrollStyle={styles.mainScrollView()} bgColor={color.white} withScroll>
        <View style={styles.mainView()}>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Price range</Text>
            <View style={styles.innerFilterItem()}>
            <View style={styles.sliderContainer()}>
              <PriceRange lowPrice={0} highPrice={500} minValue={0} maxValue={500} />
            </View>
            </View>
          </View>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Color</Text>
            <View style={styles.innerFilterItem()}>
              {
                colorsList.map((color) => {
                  return (
                    <TouchableOpacity onPress={() => toggleColors(color)} activeOpacity={0.7} style={[styles.colorItem(), selectColors.includes(color) && styles.colorItemActive()]} key={color}>
                      <View style={styles.colors(color)}></View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Size</Text>
            <View style={styles.innerFilterItem()}>
              {
                sizeList.map((size, index) => {
                  return (
                    <TouchableOpacity onPress={() => toggleSizes(size)} activeOpacity={0.5} style={[styles.sizeItem(), selectSize.includes(size) && styles.sizeItemActive()]} key={index}>
                      <Text style={[styles.sizes(), selectSize.includes(size) && styles.activeSizes()]}>{size}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Category</Text>
            <View style={styles.categoryFilterItem()}>
              {
                category.map((item) => {
                  return (
                    <TouchableOpacity onPress={() => toggleCategory(item)} activeOpacity={0.5} style={[styles.categoryItem(), selectCategory.includes(item) && styles.categoryItemActive()]} key={item}>
                      <Text style={[styles.categoryText(), selectCategory.includes(item) && styles.categoryTextActive()]}>{item}</Text>
                    </TouchableOpacity>
                  )
                }) 
              }
            </View>
          </View>
          <View style={styles.filterItem()}>
            <TouchableOpacity onPress={() => navigation.navigate('brandScreen')} style={styles.brandContainer()}>
              <Text style={styles.text()}>Brand</Text>
              <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(8)} height={size.moderateScale(12)} />
            </TouchableOpacity>
            <Text style={styles.brandText()}>adidas Original, Jack & Jones, s.Oliver</Text>
          </View>
        </View>
      </Screen>
      <View style={styles.bottomView()}>
        <Button title='Discard' onPress={() => discardFilters()} border btnStyle={styles.button()} />
        <Button title='Apply'  onPress={() => applyFilters()} btnStyle={styles.button()} />
      </View>
    </>
  )
}
