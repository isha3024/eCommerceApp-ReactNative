import React, { useEffect, useState } from 'react'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'
import { IcBackArrow, color, size } from '../../theme'
import { Button, Header, PriceRange, Screen, Text } from '../../components'
// import PriceRange from '../../components/priceRange'

const colorsList = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'];
const sizeList = ['XS', 'S', 'M', "L", 'XL']
const category = ['All', 'Women', 'Men', 'Boys', 'Girls']

export const FilterScreen = () => {

  const navigation = useNavigation();
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;

  const [selectColors, setSelectColors] = useState([]);
  const [selectSize, setSelectSize] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(500);
  const [appliedFilters, setAppliedFilters] = useState({
    colors: null,
    size: null,
    category: null,
    priceRange: null,
  })
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

  const discardFilters = () => {
    setSelectColors([]);
    setSelectSize([]);
    setSelectCategory([]);
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
    navigation.goBack()
  }

  const applyFilters = () => {
    const filters = {
      colors: selectColors,
      size: selectSize,
      category: selectCategory,
      priceRange: [minValue, maxValue],
    };
    setAppliedFilters(filters)
    navigation.navigate('catalogeScreen', {appliedFilters: filters})
  }

  useEffect(() => {
    console.log('applyFilters', appliedFilters)
  }, [appliedFilters])

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
                <PriceRange low={low} setLow={setLow} setHigh={setHigh} high={high} minValue={0} maxValue={500} />
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
        <Button title='Apply' onPress={applyFilters} btnStyle={styles.button()} />
      </View>
    </>
  )
}
