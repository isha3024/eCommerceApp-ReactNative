import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar, View, FlatList, TouchableOpacity } from 'react-native'
import { Button, Header, PriceRange, Screen, Text } from '../../components'
import { IcBackArrow, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'

const colorsList = [
  {
    colorName: 'black',
    colorBg: '#020202'
  },
  {
    colorName: 'white',
    colorBg: '#F6F6F6'
  },
  {
    colorName: 'red',
    colorBg: '#B82222'
  },
  {
    colorName: 'plum',
    colorBg: '#BEA9A9'
  },
  {
    colorName: 'beige',
    colorBg: '#E2BB8D'
  },
  {
    colorName: 'blue',
    colorBg: '#151867'
  },
]

const sizeList = [
  {
    sizeName: 'ExtraSmall',
    sizeValue: 'XS'
  },
  {
    sizeName: 'Small',
    sizeValue: 'S'
  },
  {
    sizeName: 'Medium',
    sizeValue: 'M'
  },
  {
    sizeName: 'Large',
    sizeValue: 'L'
  },
  {
    sizeName: 'ExtraLarge',
    sizeValue: 'XL'
  },
  
]

const category = [
  {
    id: 1,
    name: 'All'
  },
  {
    id: 2,
    name: 'Women'
  },
  {
    id: 3,
    name: 'Men'
  },
  {
    id: 4,
    name: 'Boys'
  },
  {
    id: 5,
    name: 'Girls'
  },
]

  export const FilterScreen = () => {
    const [active, setActive] = useState(false);
    const MIN_DEFAULT = 10;
    const MAX_DEFAULT = 500;
    const [minValue, setMinValue] = useState(MIN_DEFAULT);
    const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);

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
                sliderWidth={Math.floor(size.deviceWidth)}
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
                colorsList.map((item) => {
                  return (
                    <TouchableOpacity activeOpacity={0.7} style={styles.colorItem()} key={item.colorName}>
                      <View style={styles.colors(item.colorBg)}></View>
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
                sizeList.map((item) => {
                  return (
                    <TouchableOpacity activeOpacity={0.5} style={styles.sizeItem()} key={item.sizeName}>
                      <Text style={styles.sizes(active)}>{item.sizeValue}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.filterItem()}>
            <Text style={styles.filterItemText()}>Category</Text>
            <View style={styles.innerFilterItem()}>
              {
                category.map((item) => {
                  return (
                    <TouchableOpacity activeOpacity={0.5} style={styles.categoryItem()} key={item.id}>
                      <Text style={styles.categoryText(active)}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.filterItem()}>
            <TouchableOpacity onPress={() => navigation.navigate('brandScreen')} style={styles.brandContainer()}>
              <Text style={styles.text()}>Brand</Text>
              <IcBackArrow style={styles.forwardArrow()} />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
      <View style={styles.bottomView()}>
        <Button title='Discard' border />
        <Button title='Apply' />
      </View>
    </>
  )
}
