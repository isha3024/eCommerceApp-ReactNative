import { View, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Header, Screen, Text } from '../../components'

import * as styles from './styles'
import { IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcSearch, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'

const brands = ['adidas', 'adidas Originals', 'Blend', 'Boutique Moschino', 'Champion', 'Diesel', 'Jack & Jones', 'Naf Naf', 'Red Valentino', 's.Oliver'];

export const BrandScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectBrands, setSelectBrands] = useState([]);
  const toggleBrands = (brand) => {
    if(selectBrands.includes(brand)){
      setSelectBrands(selectBrands.filter(b => b !== brand));
    }else {
      setSelectBrands([...selectBrands, brand])
    }
  }
  const navigation = useNavigation();
  return (
    <Screen bgColor={color.white} withScroll>
      <StatusBar translucent={true} />
      <Header
          headerStyle={styles.header()}
          title
          headerTitle='Brand'
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
      />
      <View style={styles.searchBarContainer()}>
          <IcSearch width={size.moderateScale(14)} height={size.moderateScale(14)} fill={color.darkGray} />
          <TextInput 
            placeholder='Search'
            placeholderTextColor={color.darkGray}
            value={searchValue}
            onChangeText={(val) => setSearchValue(val)}
            style={styles.textInputField()}
          />
      </View>
      <View style={styles.brandContainer()}>
        {
          brands.map((brand, index) =>{
            return (
              <TouchableOpacity onPress={() => toggleBrands(brand)} key={index} style={styles.brandList()}>
                <Text style={[styles.brandName(), selectBrands.includes(brand) && styles.selectedBrandName()]}>{brand}</Text>
                  {
                    selectBrands.includes(brand) ? (<IcCheckBoxActive />) : (<IcCheckBoxInactive />)
                  }
              </TouchableOpacity>
            )
          })
        }
      </View>
    </Screen>
  )
}
