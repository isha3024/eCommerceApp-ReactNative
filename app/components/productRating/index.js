import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'

import { color, IcStar, size } from '../../theme'
import * as styles from './styles'

export const ProductRating = () => {  
  
  const [starRating, setStarRating] = useState(0);
  const starRatingOptions = [1, 2, 3, 4, 5];

  return (
    <View style={styles.rateStars()}>
      {
        starRatingOptions.map((star, index) => {
          return (
            <TouchableOpacity 
              onPress={() => {
                const filledStar = star === starRating ? star - 1 : star; 
                setStarRating(filledStar)
              }} 
              activeOpacity={0.5} key={index}>
              <IcStar 
                fill={ star <= starRating ? color.lightOrange : color.transparent } 
                stroke={star > starRating ? color.darkGray : color.transparent }
                width={size.moderateScale(36)} 
                height={size.moderateScale(34)} />
            </TouchableOpacity>
          )
        })
          
      }
    </View>
  )
}
