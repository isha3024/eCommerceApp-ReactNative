import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { Header, Screen, StarRatings, StarRatingsV2, Text } from '../../components'
import { IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcStar, IcThumb, color, images } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export const RatingsReviewsScreen = ({route}) => {
  // console.log('Reviews: ', route.params.productReview)
  const navigation = useNavigation();
  const [withPhoto, setWithPhoto] = useState(false);
  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <Header 
          headerStyle={styles.header()}
          title={false}
          headerTitle='Rating and reviews'
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }} 
        />
        <Text style={styles.mainTitle()}>Rating&Reviews</Text>
      </View>
      <Screen withScroll bgColor={color.primary} translucent={true}>
        <View style={styles.mainRatingView()}>
          <View style={styles.leftRating()}>
            <Text style={styles.ratingsPoint()}>4.3</Text>
            <Text style={styles.ratingsNumber()}>23 ratings</Text>
          </View>
          <View style={styles.rightRating()}>
            <View style={styles.ratingStar()}>
              <StarRatingsV2 ratings={5}/>
              <StarRatingsV2 ratings={4}/>
              <StarRatingsV2 ratings={3}/>
              <StarRatingsV2 ratings={2}/>
              <StarRatingsV2 ratings={1}/>
            </View>
            <View style={styles.ratingLine()}>
              <View style={styles.widthLineFull()}></View>
              <View style={styles.widthLine40()}></View>
              <View style={styles.widthLine30()}></View>
              <View style={styles.widthLine15()}></View>
              <View style={styles.widthLine8()}></View>
            </View>
            <View style={styles.ratingNum()}>
              <Text style={styles.peopleRating()}>12</Text>
              <Text style={styles.peopleRating()}>5</Text>
              <Text style={styles.peopleRating()}>4</Text>
              <Text style={styles.peopleRating()}>2</Text>
              <Text style={styles.peopleRating()}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.reviewBlock()}>
          <View style={styles.reviewHeading()}>
            <Text style={styles.h2()}>8 reviews</Text>
            <TouchableOpacity onPress={() => setWithPhoto(!withPhoto)} style={styles.withPhoto()}>
              {
                withPhoto ? (<IcCheckBoxActive />) : (<IcCheckBoxInactive />)
              }
              <Text style={styles.bodyText()}>With photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.customerReviewBlock()}>
            <View style={styles.avatar()}>
              <Image style={styles.img()} source={images.imgAvatar}/>
            </View>
            <View style={styles.customerReview()}>
              <Text style={styles.customerName()}>Helene Moore</Text>
              <View style={styles.spaceBetween()}>
                <StarRatings ratings={4} />
                <Text style={styles.lightText()}>June 5, 2019</Text>
              </View>
              <Text style={styles.reviewDesc()}>The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.</Text>
              <Text style={[styles.lightText(), styles.textRight()]}>Helpful <IcThumb /></Text>
            </View>
          </View>
        </View>
      </Screen>
    </View>
  )
}