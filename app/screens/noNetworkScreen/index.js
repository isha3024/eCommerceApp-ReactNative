import React from 'react'
import { View, Text } from 'react-native'

import * as styles from './styles'
import { Screen } from '../../components'
import { color } from '../../theme'

export const NoNetworkScreen = () => {
  return (
    <Screen bgColor={color.customBlack(0)} translucent={true} style={styles.mainView()}>
      <View style={styles.infoWrapper()}>
        <Text style={styles.noNetworkText()}>To use this application, the device needs to be conected to internet.</Text>
      </View>
    </Screen>
  )
}
