import React from 'react'
import { View } from 'react-native'

import * as styles from './styles'
import { Header } from '../../components'
import { IcBackArrow } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export const RatingsReviewsScreen = ({route}) => {
  const navigation = useNavigation();
  console.log('Reviews: ', route.params.productReview)
  return (
    <View style={styles.mainView()}>
    <View style={styles.topView()}>      
      <Header 
        headerStyle={styles.header()}
        title
        headerTitle='Rating and reviews'
        leftIconPress={() => navigation.goBack()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }} 
      />
    </View>
    <View style={styles.middleView()}>
      <Text style={styles}></Text>
    </View>
    </View>
  )
}