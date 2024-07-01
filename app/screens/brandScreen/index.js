import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from '../../components'

import * as styles from './styles'

export const BrandScreen = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.brandContainer()} onPress={onPress}>
      <Text>{label}</Text>
      <View></View>
    </TouchableOpacity>
  )
}
