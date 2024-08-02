import React from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

import * as styles from './styles';
import { Header, Screen, Text } from '../../components';
import { color, IcBackArrow, IcLogout, images, size } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux';

export const ProfileScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.authUser.userInfo);
  // console.log('user: ', userInfo)

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel',onPress: () => null},
        {text: 'OK', onPress: () => dispatch(logoutUser())}
      ]
    )
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
            <Image source={images.imgAvatarLogo} style={styles.profileImg()}/>
          </View>
          <View>
            <Text style={styles.profileName()}>{userInfo.name}</Text>
            <Text style={styles.profileEmail()}>{userInfo.email}</Text>
          </View>
        </View>
        <View style={styles.profileOptionsList()}>
          <TouchableOpacity onPress={() => navigation.navigate('orderScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>My Orders</Text>
              <Text style={styles.message()}>Already have 12 orders</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('addressScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>Shipping Address</Text>
              <Text style={styles.message()}>3 addresses</Text>
            </View>
            <IcBackArrow fill={color.darkGray} width={size.moderateScale(8)} height={size.moderateScale(12)} style={styles.forwardArrow()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('paymentMethodScreen')} activeOpacity={0.6} style={styles.profileOptionItem()}>
            <View>
              <Text style={styles.profileOptionTitle()}>Payment Method</Text>
              <Text style={styles.message()}>Visa **34</Text>
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