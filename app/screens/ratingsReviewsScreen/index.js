import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, LayoutAnimation, Platform, StatusBar, TouchableOpacity, UIManager, View, Animated, TextInput, ScrollView } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'

import * as styles from './styles'
import * as data from '../../json'
import { BottomSheetContainer, Button, CustomCamera, Header, ProductRating, Screen, StarRatings, StarRatingsV2, Text } from '../../components'
import { IcBackArrow, IcCamera, IcCheckBoxActive, IcCheckBoxInactive, IcPen, IcStar, IcThumb, color, images, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { opacity } from 'react-native-redash'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}


export const RatingsReviewsScreen = ({route}) => {
  
  const reviewData = data.reviewsList;
  const navigation = useNavigation();
  
  const [productReview, setProductReview] = useState([]);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [showReviewWithImg, setShowReviewWithImg] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addReviewImage, setAddReviewImage] = useState([]);
  
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
  
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    ImagePicker.launchImageLibrary(options, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
      setAddReviewImage([...addReviewImage, imageUri]);
    }
  };

  const handleOnScrollUP = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowHeaderTitle(true)
  }

  const handleOnScrollDOWN = () => {
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
          <Image style={styles.img()} source={images.imgAvatarLogo} />
        </View>
        <View style={styles.customerReview()}>
          <Text style={styles.customerName()}>{item.reviewerName}</Text>
          <View style={styles.spaceBetween()}>
            <StarRatings ratings={item?.rating} ratingsCounts={item?.rating} />
            <Text style={styles.lightText()}>{item?.date.split("T")[0]}</Text>
          </View>
          <Text style={styles.reviewDesc()}>{item?.comment}</Text>
          {
            showReviewWithImg && item?.image ( 
              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.customerProductImages()}>
                <Animated.Image source={item.reviewProductImageOne} style={[styles.reviewProductImgItem()]}/>
                <Image source={item.reviewProductImageTwo} style={styles.reviewProductImgItem()}/>
                <Image source={item.reviewProductImageThree} style={styles.reviewProductImgItem()}/>
              </ScrollView>
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

  useEffect(() => {
    const { productReview } = route.params;
    setProductReview(productReview.reviews)
  },[route.params.productReview])

  return (
    <View withScroll style={styles.mainView()}>
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
              data={productReview}
              showsVerticalScrollIndicator={false}
              renderItem={renderReviewsBlock}
              contentContainerStyle={styles.flatListContainer()}
              keyExtractor={(item, index) => item+index}
              onScroll={(e) => {
                const scrolling = e.nativeEvent.contentOffset.y;
                if(scrolling > 150){
                  handleOnScrollUP()
                }else if(scrolling > 0 && scrolling < 500){
                  handleOnScrollDOWN()
                }
              }}
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
        customHeight={'73%'}
        onClose={handleCloseReview}>
          <Text style={styles.addReviewTitle()}>What is your rate ?</Text>
          <ProductRating />
          <Text style={styles.reviewBodyText()}>Please share your opinion about the product</Text>
          <TextInput 
            autoCapitalize={true}
            placeholder='Your review'
            placeholderTextColor={color.darkGray}
            multiline={true}
            numberOfLines={8}
            style={styles.reviewText()}
          />
          <View style={styles.cameraRollUpdate()}>
          {
            selectedImage && (
              <BottomSheetScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: size.moderateScale(16), paddingRight: size.moderateScale(16) }}>
                {
                  addReviewImage.map((productReviewImg, index) => {
                    console.log('productReviewImg: ', productReviewImg);
                    return (
                      <View style={styles.productReviewImgWrapper()} key={index}>
                        <Image source={{ uri: productReviewImg }} style={styles.productReviewImg()} />
                      </View>
                    )
                  })
                }
              </BottomSheetScrollView>
            )
          }
          
          <TouchableOpacity onPress={openImagePicker} activeOpacity={0.8} style={styles.cameraView()}>
            <IcCamera />
            <Text style={styles.cameraText()}>Add your photos</Text>
          </TouchableOpacity>
          </View>
          
          <Button onPress={handleCloseReview} title='SEND REVIEW' btnStyle={styles.buttonSendReview()}/>
         
      </BottomSheetContainer>
    </View>
  )
}