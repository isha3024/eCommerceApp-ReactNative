import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar, View, FlatList, TouchableOpacity } from 'react-native'
import { Button, Header, PriceRange, Screen, Text } from '../../components'
import { IcBackArrow, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'

const colorsList = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'];

const sizeList = ['XS', 'S', 'M', "L", 'XL']


const category = ['All', 'Women', 'Men', 'Boys', 'Girls']

export const FilterScreen = () => {

  const [selectColors, setSelectColors] = useState([]);
  const [selectSize, setSelectSize] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);

  const toggleColors = (color) => {
    if(selectColors.includes(color)){
      setSelectColors(selectColors.filter(col => col !== color));
    }else {
      setSelectColors([...selectColors, color]);
    }
  }
  const toggleSizes = (size) => {
    if(selectSize.includes(size)){
      setSelectSize(selectSize.filter(s => s !== size));
    }else {
      setSelectSize([...selectSize, size]);
    }
  } 
  const toggleCategory = (cat) => {
    if(selectCategory.includes(cat)){
      setSelectCategory(selectCategory.filter(c => c !== cat));
    }else {
      setSelectCategory([...selectCategory, cat]);
    }
  }

  useEffect(() => {
    if(selectColors.length === 0){
      setSelectColors([colorsList[0], colorsList[4]])
    }
    if(selectSize.length === 0){
      setSelectSize([sizeList[1], sizeList[2]])
    }
    if(selectCategory.length === 0){
      setSelectCategory([category[0]])
    }
  })

  const applyFilters = () => {
    navigation.navigate('catalogeScreen');
  }
 
  const discardFilters = () => {
    setSelectColors(['']);
    setSelectSize(['']);
    setSelectCategory(['']);
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
  }

  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const navigation = useNavigation();
  return (
    <>
      <Screen bgColor={color.white} withScroll>
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
        <View style={styles.mainView()}>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Price range</Text>
            <View style={styles.innerFilterItem()}>
            <View style={styles.sliderContainer()}>
              <PriceRange 
                min={MIN_DEFAULT}
                max={MAX_DEFAULT}
                steps={1}
                sliderWidth={353}
                onValueChange={(range) => {
                  setMinValue(range.min);
                  setMaxValue(range.max);
                }}
              />
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
