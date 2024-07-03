import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IcStar, color } from '../../theme'

import * as styles from './styles'

export const StarRatings = ({customStarRatingStyle, ratings, ratingsCounts}) => {
  const [defaultRating, setDefaultRating] = useState(ratings);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <View style={[styles.starContainer(), customStarRatingStyle]}>
      {
        maxRating.map((item, key) => {
          return (item <= defaultRating ? (<IcStar fill={color.lightOrange} key={key} />) 
          : (<IcStar stroke={color.darkGray} key={key} />))
        })
      }
      <Text style={styles.reviews()}>({ratingsCounts})</Text>
    </View>
  )
}
