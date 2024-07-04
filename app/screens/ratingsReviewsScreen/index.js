import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ScrollView, LayoutAnimation, Platform, StatusBar, TouchableOpacity, UIManager, View, Animated, TextInput } from 'react-native'

import * as styles from './styles'
import * as data from '../../json'
import { BottomSheetContainer, Button, CustomCamera, Header, StarRatings, StarRatingsV2, Text } from '../../components'
import { IcBackArrow, IcCamera, IcCheckBoxActive, IcCheckBoxInactive, IcPen, IcStar, IcThumb, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}


export const RatingsReviewsScreen = ({route}) => {
  // console.log('Reviews: ', route.params.productReview)
  const reviewData = data.reviewsList;
  // console.log('reviewData: ', reviewData);
  
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [showReviewWithImg, setShowReviewWithImg] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false)
  const showImages = useRef(new Animated.Value(0)).current;

  const toggleReviewImages = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowReviewWithImg(!showReviewWithImg)
  }

  const handleAddReview = () => {
    setShowAddReview(true);
  }
  const handleCloseReview = () => {
    setShowAddReview(false);
  }
  const renderCamera = () => {
    return (<CustomCamera />)
  }

  const handleOnScrollUP = () => {
    // LayoutAnimation.configureNext({
    //   duration: 500,
    //   create: {type: 'linear', property: 'opacity'},
    //   update: {type: 'linear', property: 'opacity'},
    //   delete: {type: 'linear', property: 'opacity'}
    // })
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowHeaderTitle(true)
  }

  const handleOnScrollDOWN = () => {
    // 
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowHeaderTitle(false)
  }

  const renderReviewsBlock = ({item}) => { 
    return(
      <View style={styles.customerReviewBlock()}>
        <View style={styles.avatar()}>
          <Image style={styles.img()} source={item.customerImg} />
        </View>
        <View style={styles.customerReview()}>
          <Text style={styles.customerName()}>{item.customerName}</Text>
          <View style={styles.spaceBetween()}>
            <StarRatings ratings={item.customerRatings} />
            <Text style={styles.lightText()}>{item.reviewPostedDate}</Text>
          </View>
          <Text style={styles.reviewDesc()}>{item.reviewDescription}</Text>
          {
            showReviewWithImg && (
              <Animated.View style={{opacity: showImages}}>
                <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.reviewProductImages()}>
                  <Image source={item.reviewProductImageOne} style={styles.reviewProductImgItem()}/>
                  <Image source={item.reviewProductImageTwo} style={styles.reviewProductImgItem()}/>
                  <Image source={item.reviewProductImageThree} style={styles.reviewProductImgItem()}/>
                </ScrollView>
              </Animated.View>
            )
          }
          <TouchableOpacity activeOpacity={0.5} style={styles.textRight()}>
            <Text style={styles.lightText()}>Helpful</Text>
            <IcThumb />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const navigation = useNavigation();
  return (
    <View style={styles.mainView()}>
      <StatusBar backgroundColor={color.primary} translucent={true}/>
      <View style={styles.topView()}>
        <Header
          headerStyle={styles.header(showHeaderTitle)}
          title={showHeaderTitle}
          headerTitle='Rating and reviews'
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
        />
      </View>
      <View style={styles.middleView()}>
          {
            showHeaderTitle ? null 
            : (
              <>
                <Text style={styles.mainTitle()}>{showHeaderTitle ? '' : 'Rating&Reviews'}</Text>
                <View style={styles.mainRatingView()}>
                  <View style={styles.leftRating()}>
                    <Text style={styles.ratingsPoint()}>4.3</Text>
                    <Text style={styles.ratingsNumber()}>23 ratings</Text>
                  </View>
                  <View style={styles.rightRating()}>
                    <View style={styles.ratingStar()}>
                      <StarRatingsV2 ratings={5} />
                      <StarRatingsV2 ratings={4} />
                      <StarRatingsV2 ratings={3} />
                      <StarRatingsV2 ratings={2} />
                      <StarRatingsV2 ratings={1} />
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
              </>
            )
          }
        <View style={styles.reviewBlock()}>
          <View style={styles.reviewHeading()}>
            <Text style={styles.h2()}>8 reviews</Text>
            <TouchableOpacity activeOpacity={0.5} 
              onPress={toggleReviewImages} 
              style={styles.withPhoto()}>
              {
                showReviewWithImg ? (<IcCheckBoxActive fill={color.mostlyBlack} />) : (<IcCheckBoxInactive />)
              }
              <Text style={styles.bodyText()}>With photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.customerReviewMainBlock()}>
            <FlatList
              data={reviewData}
              showsVerticalScrollIndicator={false}
              renderItem={renderReviewsBlock}
              keyExtractor={(item, index) => item+index}
              onScroll={(e) => {
                const scrolling = e.nativeEvent.contentOffset.y;
                if(scrolling > 150){
                  handleOnScrollUP()
                }else if(scrolling > 0 && scrolling < 500){
                  handleOnScrollDOWN()
                }
              }}
              contentContainerStyle={styles.flatListContainer()}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomView()}>
      <LinearGradient 
          colors={['rgba(255, 255, 255, .02)','rgba(255, 255, 255, .6)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']} 
          locations={[0.1, 0.3, 0.7, 0.8]}
          start={{x: 0, y: 0}} 
          end={{x: 0, y: 1}} style={styles.linearGradient()}>
        <Button 
          onPress={handleAddReview}
          title='Write a review' activeOpacity={0.8}
          icon
          renderIcon={() => (<IcPen />)}
          btnStyle={styles.reviewButton()}
          btnTextStyle={styles.reviewButtonText()} />
      </LinearGradient>
      </View>
      <BottomSheetContainer
        isVisible={showAddReview}
        onClose={handleCloseReview}
        customHeight={'73%'}>
          <Text style={styles.addReviewTitle()}>What is your rate ?</Text>
          <View style={styles.rateStars()}>
            <TouchableOpacity activeOpacity={0.5}>
              <IcStar stroke={color.darkGray} width={size.moderateScale(36)} height={size.moderateScale(34)} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <IcStar stroke={color.darkGray} width={size.moderateScale(36)} height={size.moderateScale(34)} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <IcStar stroke={color.darkGray} width={size.moderateScale(36)} height={size.moderateScale(34)} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <IcStar stroke={color.darkGray} width={size.moderateScale(36)} height={size.moderateScale(34)} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <IcStar stroke={color.darkGray} width={size.moderateScale(36)} height={size.moderateScale(34)} />
            </TouchableOpacity>
          </View>
          <Text style={styles.reviewBodyText()}>Please share your opinion about the product</Text>
          <TextInput 
            autoCapitalize={true}
            placeholder='Your review'
            placeholderTextColor={color.darkGray}
            multiline={true}
            numberOfLines={8}
            style={styles.reviewText()}
          />
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.customerProductImages()}>
            <TouchableOpacity onPress={renderCamera} activeOpacity={0.8} style={styles.cameraView()}>
              <IcCamera />
              <Text style={styles.cameraText()}>Add your photos</Text>
            </TouchableOpacity>
          </ScrollView>
          <Button title='SEND REVIEW' btnStyle={styles.buttonSendReview()}/>
      </BottomSheetContainer>
    </View>
  )
}