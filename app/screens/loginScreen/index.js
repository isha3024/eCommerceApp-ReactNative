import React, { useRef, useState } from 'react'
import { Animated, Platform, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'
import { IcBackArrow, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({}); 
  const [inputField, setInputField] = useState({
    email: '',
    password: ''
  })

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }
  
  const handleChange = (field, value) => {
    setInputField({
      ...inputField,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if(handleValidations()){
      setErrors({
        email: '',
        password: ''
      })
      navigation.navigate('bottomStackNavigation')
    }
  }

  const handleValidations = () => {
    let newErrors = {};

    if(!inputField.email){
      newErrors.email = 'Email is required'
    }else if(EmailValidation(inputField)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
    }

    if(!inputField.password){
      newErrors.password = 'Password is required'
    }else if(inputField.password.length < 8){
      newErrors.password = 'Password length must be greater than 8'
    }

    setErrors(newErrors)
    shake()
    return Object.keys(newErrors).length === 0
  }

  const handleNavigation = () => {
    setErrors({
      email: '',
      password: ''
    })
    setTimeout(() => {
      navigation.navigate('Register')
    }, 300)
  }

  return (
    <Screen withScroll bgColor={color.primary} translucent={true} style={styles.mainView()}>
      <View style={styles.topContainer()}>
      <Header
        headerStyle={styles.header()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(15)} />)
        }}
        leftIconPress={handleNavigation}
      />
        <Text style={styles.mainTitleText()}>Login</Text>
      </View>
      <View style={styles.middleContainer()}>
        <Animated.View style={[styles.inputView(), { transform: [{ translateX: shakeAnim }] }]}>
        <InputField 
          error={errors.email}
          value={inputField.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={(val) => handleChange('email', val)}
          keyboardType='email-address'
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.email ? (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            ): null
          )}
        />
        {errors.email ? 
          (<Text style={styles.errorText()}>{errors.email}</Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </Animated.View>
        <Animated.View style={[styles.inputView(), { transform: [{ translateX: shakeAnim }] }]}>
        <InputField
          error={errors.password}
          value={inputField.password}
          placeholder={'Password'}
          label={'Password'}
          onChangeText={(val) => handleChange('password', val)}
          keyboardType='default'
          secureTextEntry={true}
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.password ? (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            ): null
          )}
        />
        {errors.password ? 
          (<Text style={styles.errorText()}>{errors.password}</Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </Animated.View>
        <TouchableOpacity style={styles.textAlignRight()} activeOpacity={0.5} onPress={handleNavigation}>
          <Text style={styles.text()}>Forget your password?</Text>
          <IcForwardArrow width={size.moderateScale(15)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        <Button activeOpacity={0.8} btnStyle={styles.buttonWithText()} title={'SIGN UP'} disabled={false} onPress={handleSubmit} />
      </View>
      <View style={styles.bottomContainer()}>
        <Text style={styles.text()}>Or sign up with social account</Text>
        <View style={styles.buttonContainer()}>
          <TouchableOpacity style={styles.button()}>
            <IcGoogle style={styles.buttonIcon()} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button()}>
            <IcFacebook style={styles.buttonIcon()} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}