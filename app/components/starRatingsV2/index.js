import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { IcStar, color } from '../../theme'
import * as styles from './styles'

export const StarRatingsV2 = ({ratings}) => {
  const [defaultRating, setDefaultRating] = useState(ratings);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <View style={[styles.starContainer()]}>
      {
        maxRating.map((item, key) => {
          return (item <= defaultRating ? (<IcStar fill={color.lightOrange} key={key} />) 
          : (<IcStar stroke={color.transparent} key={key} />))
        })
      }
    </View>
  )
}
