import React, { useRef, useState } from 'react'
import { Alert, Animated, Keyboard, Platform, StatusBar, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as styles from './styles'
import { IcBackArrow, IcCheck, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Text } from '../../components'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux'


if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const LoginScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
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
  
  const handleChange = (value, field) => {
    setInputField({
      ...inputField,
      [field]: value
    });
  };

  const handleValidations = () => {
    let newErrors = {};
      
    if(!inputField.email){
      newErrors.email = 'Email is required'
      setIsEmailValid(false)
    } else if(EmailValidation(inputField.email)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
    }

    if(!inputField.password){
      newErrors.password = 'Password is required'
      setIsPasswordValid(false)
    }else if(inputField.password.length < 8){
      newErrors.password = 'Password length must be greater than 8'
      setIsPasswordValid(false)
    }else {
      setIsPasswordValid(true)
    }

    setErrors(newErrors)
    shake()
    return Object.keys(newErrors).length === 0
  }

  const  handleSubmit = async () => {
    if (handleValidations()) {
      Keyboard.dismiss()
      setErrors({
        email: '',
        password: ''
      })
      const userData = {
        email: inputField?.email,
        password: inputField?.password
      }
      dispatch(loginUser(userData))
      // navigation.navigate('bottomStackNavigation')
    }
  }

  const handleHeaderBackPress = () => {
    setErrors({
      email: '',
      password: ''
    })
    setInputField({
      email: '',
      password: ''
    })
    navigation.navigate('Register')
  }

  const handleForgetPasswordPress = () => {
    setErrors({
      email: '',
      password: ''
    })
    setInputField({
      email: '',
      password: ''
    })
    setIsEmailValid(false);
    setIsPasswordValid(false);
    navigation.navigate('ForgetPassword')
  }

  return (
    <View style={styles.mainView()}>
      <View style={styles.topContainer()}>
        <StatusBar translucent backgroundColor={color.primary} barStyle={'dark-content'}/>
        <Header
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(15)} />)
          }}
          leftIconPress={handleHeaderBackPress}
        />
        <Text style={styles.mainTitleText()}>Login</Text>
      </View>
      <View style={styles.middleContainer()}>
        <Animated.View style={[styles.inputView(), errors.email &&  { transform: [{ translateX: shakeAnim }] }]}>
        <InputField 
          error={errors.email}
          value={inputField?.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={(val) => handleChange(val, 'email')}
          keyboardType='email-address'
          editable={loading ? false : true}
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.email ? 
            (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />) 
            : isEmailValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} />) 
          )}
        />
        {errors.email ? 
        (<Text style={styles.errorText()}>{errors.email}</Text>) 
        : (<Text style={styles.noError()}></Text>)
        }
        </Animated.View>
        <Animated.View style={[styles.inputView(), errors.password && { transform: [{ translateX: shakeAnim }] }]}>
        <InputField
          error={errors.password}
          value={inputField?.password}
          placeholder={'Password'}
          label={'Password'}
          secureTextEntry={true}
          onChangeText={(val) => handleChange(val, 'password')}
          keyboardType='default'
          editable={loading ? false : true}
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.password 
            ? (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />)
            : isPasswordValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} fill={color.success} />)
          )}
        />
        {errors.password ? 
          (<Text style={styles.errorText()}>{errors.password}</Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </Animated.View>
        <TouchableOpacity style={styles.textAlignRight()} activeOpacity={0.5} onPress={loading ? () => null : handleForgetPasswordPress}>
          <Text style={styles.text()}>Forget your password?</Text>
          <IcForwardArrow width={size.moderateScale(15)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        <Button 
          activeOpacity={0.8} 
          btnStyle={styles.buttonWithText()} 
          title='LOGIN' 
          disabled={loading} 
          loading={loading}
          onPress={handleSubmit} 
        />
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
    </View>
  )
}