import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { IcStar, color } from '../../theme'
import * as styles from './styles'

export const StarRatings = ({customStarRatingStyle, ratings, ratingsCounts}) => {
  
  const [defaultRating, setDefaultRating] = useState(ratings);
  // console.log('defaultRating: ', defaultRating)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  if(ratingsCounts < 2 && ratingsCounts > 1) {
    console.log('ratingsCounts: ', ratingsCounts)
  }

  return (
    <View style={[styles.starContainer(), customStarRatingStyle]}>
      {
        maxRating.map((item, key) => {
          return (item <= defaultRating ? (<IcStar fill={color.lightOrange} key={key} />) 
          : (<IcStar stroke={color.darkGray} key={key} />))
        })
      }
      {
        ratingsCounts ? <Text style={styles.reviews()}>({ratingsCounts})</Text> : null
      }
    </View>
  )
}
