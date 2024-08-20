import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TouchableOpacity, UIManager, View, Keyboard, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import auth from '@react-native-firebase/auth'

import { EmailValidation } from '../../utils/functions'
import { registerUser } from '../../redux'
import { Button, Header, InputField, Text } from '../../components'
import { IcBackArrow, IcCheck, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import * as styles from './styles'


if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // const [isNameValid, setIsNameValid] = useState(false)
  // const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [inputField, setInputField] = useState({
    // name: '',
    // username: '',
    email: '',
    password: ''
  })
  
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
    // if(!inputField.name){
    //   newErrors.name = 'Name is required'
    //   setIsNameValid(false);
    // }else if(inputField.name.length < 2){
    //   newErrors.name = 'Name length must be greater than 2 letter'
    //   setIsNameValid(false);
    // }else {
    //   setIsNameValid(true)
    // }

    // if(!inputField.username){
    //   newErrors.username = 'Username is required'
    //   setIsUsernameValid(false);
    // }else if(inputField.username.length < 2){
    //   newErrors.username = 'Username length must be greater than 2 letter'
    //   setIsUsernameValid(false);
    // }else {
    //   setIsUsernameValid(true)
    // }

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
    }
    // else if(inputField.password.length < 8){
    //   newErrors.password = 'Password length must be greater than 8'
    //   setIsPasswordValid(false)
    // }
    else {
      setIsPasswordValid(true)
    }

    setErrors(newErrors)
    shake();
    return Object.keys(newErrors).length === 0
  }


  //handle submit function using axios and redux
  // const  handleSubmit = async () => {
  //   if (!validateForm()) {
  //     return;
  //   }else {
  //     Keyboard.dismiss()
  //     setErrors({
  //       name: '',
  //       userName: '',
  //       email: '',
  //       password: ''
  //     })

  //     const body = {
  //       firstName: inputField.name,
  //       username: inputField.username,
  //       email: inputField.email,
  //       password: inputField.password
  //     }

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: JSON.stringify(body),
  //     }

  //     setLoading(true);
  //     try {
  //       const response = await axios('https://dummyjson.com/user/add', options);
  //       if(response.status === 201) {
  //         setLoading(false);
  //         ToastAndroid.show('Succesfull Registration', ToastAndroid.SHORT);
  //         dispatch(registerUser(body))
  //       }
  //     }
  //     catch (error) {
  //       setLoading(false);
  //       ToastAndroid.show('Error Occured', ToastAndroid.SHORT)
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   }
  // }

  //handle submit function using firebase/auth
  
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const email = inputField?.email;
    const password = inputField?.password;

    setLoading(true)
    auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      if(response) {
        setLoading(false);
        ToastAndroid.show('Succesfull Registration', ToastAndroid.SHORT);
        navigation.navigate('Login')
      }
    })
    .catch((error) => {
      console.log('error: ',error)
      if(error.code == 'auth/email-already-in-use') {
        setLoading(false);
        ToastAndroid.show('Email already exists', ToastAndroid.SHORT);
      }

      if(error.code === 'auth/invalid-email') {
        setLoading(false);
        ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
      }

      if(error.code === 'auth/weak-password') {
        setLoading(false);
        ToastAndroid.show('Weak Password', ToastAndroid.SHORT);
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const handleNavigation = () => {
    setErrors({
      // name: '',
      // username: '',
      email: '',
      password: ''
    })
    setInputField({
      // name: '',
      // username: '',
      email: '',
      password: ''
    })
    // setIsNameValid(false);
    // setIsEmailValid(false)
    setIsEmailValid(false);
    setIsPasswordValid(false);
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
        {/* <Animated.View style={[styles.inputView(), errors.name && { transform: [{ translateX: shakeAnim }] }]}>
          <InputField 
            error={errors.name}
            value={inputField?.name}
            placeholder={'Name'}
            label={'Name'}
            autoCapitalize={true}
            onChangeText={(val) => handleChange(val, 'name')}
            editable={true}
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
        <Animated.View style={[styles.inputView(), errors.username && { transform: [{ translateX: shakeAnim }] }]}>
          <InputField 
            error={errors.username}
            value={inputField?.username}
            placeholder={'Username'}
            label={'Username'}
            autoCapitalize='none'
            onChangeText={(val) => handleChange(val, 'username')}
            editable={true}
            keyboardType='default'
            icon
            iconPlace='right'
            renderRightIcon={() => (
            errors.username 
            ? (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />)
            : isNameValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} />) 
            )}
          />
          {errors.username ? 
            (<Text style={styles.errorText()}>{errors.username}</Text>) 
            : (<Text style={styles.noError()}></Text>)
          }
        </Animated.View> */}
        <Animated.View style={[styles.inputView(), errors.email &&  { transform: [{ translateX: shakeAnim }] }]}>
        <InputField 
          error={errors.email}
          value={inputField?.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={(val) => handleChange(val, 'email')}
          keyboardType='email-address'
          autoCapitalize='none'
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
        <Button 
          activeOpacity={0.8} 
          btnStyle={styles.buttonWithText()} 
          title='SIGN UP' 
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
