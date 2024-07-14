import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as styles from './styles'
import { IcBackArrow, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'



if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const [userData, setUserData] = useState(undefined);

  const getUserData = async () => {
    const URL = 'https://jsonplaceholder.typicode.com/posts/1'
    let userDataResult = await fetch(URL);
    userDataResult = await userDataResult.json();
    setUserData(userDataResult)
  }

  useEffect(() => {
    getUserData();
  },[])

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputField, setInputField] = useState({
    name: '',
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

  const validateForm = () => {
    let newError = {};
    if(!inputField.name){
      newError.name = 'Name is required'
    }

    if(!inputField.email){
      newError.email = 'Email is required'
    }else if(EmailValidation(inputField)){
      newError.email = 'Not a valid email address. Should be your@email.com'
    }

    if(!inputField.password){
      newError.password = 'Password is required'
    }else if(inputField.password.length < 8){
      newError.password = 'Password length must be greater than 8'
    }

    setErrors(newError)
    shake();
    return Object.keys(newError).length === 0
  }

  const handleSubmit = () => {
    if(validateForm()){
      setErrors({
        name: '',
        email: '',
        password: ''
      })
      navigation.navigate('Login')
    }
  }

  const handleNavigation = () => {
    setErrors({
      name: '',
      email: '',
      password: ''
    })
    setTimeout(() => {
      navigation.navigate('Login')
    }, 300)
  }

  return (
    <Screen withScroll translucent={true} bgColor={color.primary} style={styles.mainView()}>
      <View style={styles.topContainer()}>
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
        <Animated.View style={[styles.inputView(), { transform: [{ translateX: shakeAnim }] }]}>
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
              errors.name && (
                <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
              )
            )}
          />
          {errors.name ? 
            (<Text style={styles.errorText()}>{errors.name}</Text>) 
            : (<Text style={styles.noError()}></Text>)
          }
        </Animated.View>
        <Animated.View style={[styles.inputView(), { transform: [{ translateX: shakeAnim }] }]}>
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
            errors.email && (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            )
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
          value={inputField?.password}
          placeholder={'Password'}
          label={'Password'}
          secureTextEntry={true}
          onChangeText={(val) => handleChange(val, 'password')}
          keyboardType='default'
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.password && (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            )
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
    </Screen>
  )
}
