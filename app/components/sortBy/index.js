import React, { useState } from 'react'

import * as styles from './styles'
import { Text } from '../text'
import { FlatList } from 'react-native-gesture-handler'
import { color } from '../../theme'
import { View } from 'react-native'
import { TouchableOpacity } from '@gorhom/bottom-sheet'



const sortProductType = [
  {
    id: 1,
    name: 'Popular'
  },
  {
    id: 2,
    name: 'Newest'
  },
  {
    id: 3,
    name: 'Customer review'
  },
  {
    id: 4,
    name: 'Price: lowest to high'
  },
  {
    id: 5,
    name: 'Price: highest to low'
  }
]

export const SortBy = () => {

  const [isSelected, setIsSelected] = useState(false);

  const renderSortProductTypes = ({item}) => {
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => setIsSelected(item)} style={[styles.sortListItem(), item.id === isSelected?.id && styles.selectedItem()]}>
        <Text style={[styles.sortItemText(), item.id === isSelected?.id && styles.selectedItemText()]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <FlatList
        data={sortProductType}
        renderItem={renderSortProductTypes}
        keyExtractor={(item) => item.id}
      />
    </>
  )
}
