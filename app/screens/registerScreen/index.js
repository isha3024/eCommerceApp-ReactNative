import React, { useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as styles from './styles'
import { IcBackArrow, IcCheck, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Text } from '../../components'
import { userAdd } from '../../redux'

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [inputField, setInputField] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  
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

  const validateForm = () => {
    let newErrors = {};
    if(!inputField.name){
      newErrors.name = 'Name is required'
      setIsNameValid(false);
    }else if(inputField.name.length < 2){
      newErrors.name = 'Name length must be greater than 2 letter'
      setIsNameValid(false);
    }else {
      setIsNameValid(true)
    }

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
    shake();
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if(validateForm()){
      setErrors({
        name: '',
        email: '',
        password: ''
      })
    // userAdd(inputField)
    navigation.navigate('Login')
    }
  }

  const handleNavigation = () => {
    setErrors({
      name: '',
      email: '',
      password: ''
    })
    navigation.navigate('Login')
  }

  return ( 
    <View style={styles.mainView()}>
      <View style={styles.topContainer()}>
        <StatusBar translucent backgroundColor={color.primary} barStyle='dark-content'/>
        <Header
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(15)} />)
          }}
        />
        <Text style={styles.mainTitleText()}>Sign Up</Text>
      </View>
      <View style={styles.middleContainer()}>
        <Animated.View style={[styles.inputView(), errors.name && { transform: [{ translateX: shakeAnim }] }]}>
          <InputField 
            error={errors.name}
            value={inputField?.name}
            placeholder={'Name'}
            label={'Name'}
            autoCapitalize={true}
            onChangeText={(val) => handleChange(val, 'name')}
            keyboardType='default'
            icon
            iconPlace='right'
            renderRightIcon={() => (
            errors.name 
            ? (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />)
            : isNameValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} />) 
            )}
          />
          {errors.name ? 
            (<Text style={styles.errorText()}>{errors.name}</Text>) 
            : (<Text style={styles.noError()}></Text>)
          }
        </Animated.View>
        <Animated.View style={[styles.inputView(), errors.email &&  { transform: [{ translateX: shakeAnim }] }]}>
        <InputField 
          error={errors.email}
          value={inputField?.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={(val) => handleChange(val, 'email')}
          keyboardType='email-address'
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
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.password 
            ? (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />) 
            : isPasswordValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} />) 
          )}
        />
        {errors.password ? 
          (<Text style={styles.errorText()}>{errors.password}</Text>) 
          : (<Text style={styles.noError()}></Text>)
        }
        </Animated.View>
        <TouchableOpacity style={styles.textAlignRight()} activeOpacity={0.5} onPress={handleNavigation}>
          <Text style={styles.text()}>Already have an account?</Text>
          <IcForwardArrow width={size.moderateScale(15)} height={size.moderateScale(10)} />
        </TouchableOpacity>
        {/* <Button btnStyle={styles.buttonWithText()} title={'SIGN UP'} disabled={false} onPress={() => navigation.navigate('Login')} /> */}
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
    </View>
  )
}
