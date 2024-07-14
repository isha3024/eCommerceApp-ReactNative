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

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacityStyle = {opacity: opacityAnim}
  const animate = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start()
    })
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
    animate()
    return Object.keys(newErrors).length === 0
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
      />
        <Text style={styles.mainTitleText()}>Login</Text>
      </View>
      <View style={styles.middleContainer()}>
        <View style={styles.inputView()}>
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
          (<Animated.Text style={[styles.errorText(), opacityStyle]}>{errors.email}</Animated.Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </View>
        <View style={styles.inputView()}>
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
          (<Animated.Text style={[styles.errorText(), opacityStyle]}>{errors.password}</Animated.Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </View>
        <TouchableOpacity style={styles.textAlignRight()} activeOpacity={0.5} onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.text()}>Forget your password?</Text>
          <IcForwardArrow width={size.moderateScale(15)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        <Button btnStyle={styles.buttonWithText()} title={'SIGN UP'} disabled={false} onPress={handleSubmit} />
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