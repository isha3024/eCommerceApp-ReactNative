import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, ToastAndroid, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth'

import * as styles from './styles';
import { Header, Screen, Text } from '../../components';
import { color, IcBackArrow, IcLogout, images, size } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux';
import { useMainContext } from '../../contexts/MainContext';

export const ProfileScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.authUser.userInfo);
  const { addresses, paymentCardSelected, getOrdersFromStorage, orders } = useMainContext();

  useFocusEffect(
    useCallback(() => {
      getOrdersFromStorage()
    },[])
  )

  let maskedNumber = ''
  if(Object.keys(paymentCardSelected).length !== 0){
    let slicedNumber = paymentCardSelected.cardNumber.slice(-2);
    maskedNumber = '**'+slicedNumber;
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel',onPress: () => null},
        {text: 'OK', onPress: () => logout()}
      ]
    )
    
    function logout () {
      dispatch(logoutUser());
      auth().signOut()
      .then(() => {
        navigation.navigate('authStackNavigation');
      })
      .catch(error => {
        console.error(error);
      })

      ToastAndroid.show('User Logout', ToastAndroid.SHORT);
    }
    
  }
  
  return (
    <Screen translucent={true} bgColor={color.primary} style={styles.mainContainer()}>
      <Header 
        headerStyle={styles.header()}
        headerRightIcon
        rightIcon={() => {
          return (
            <IcLogout />
          )
        }}
        rightIconPress={handleLogout}
      />
      <View style={styles.profileContainer()}>
        <Text style={styles.mainTitle()}>My profile</Text>
        <View style={styles.profileInfo()}>
          <View style={styles.profileImgView()}>
            <Image source={{uri: userInfo.photo}} style={styles.profileImg()}/>
          </View>
          <View>
            <Text style={styles.profileName()}>{userInfo.givenName} {userInfo.familyName}</Text>
            <Text style={styles.profileEmail()}>{userInfo.email}</Text>
          </View>
        </View>
        <View style={styles.profileOptionsList()}>
          <TouchableOpacity onPress={() => navigation.navigate('orderScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>My Orders</Text>
              <Text style={styles.message()}>{orders && orders.length > 0 ? `Already have ${orders.length} orders` : 'No orders yet'}</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('addressScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>Shipping Address</Text>
              <Text style={styles.message()}>{addresses.length > 0 ? `${addresses.length} addresses` : 'No addressess'}</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('paymentMethodScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>Payment Method</Text>
              <Text style={styles.message()}>{Object.keys(paymentCardSelected).length === 0 ? 'No payment cards' : 'Visa '+maskedNumber}</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>Promocodes</Text>
              <Text style={styles.message()}>You have special promocodes</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>My Reviews</Text>
              <Text style={styles.message()}>Review for 4 items</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('settingsScreen')} activeOpacity={0.6} style={[styles.profileOptionItem(), styles.profileOptionItemLast()]}>
            <View>
              <Text style={styles.profileOptionTitle()}>Settings</Text>
              <Text style={styles.message()}>Notification, Password</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};