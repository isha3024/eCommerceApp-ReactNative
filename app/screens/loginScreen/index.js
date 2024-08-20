import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Animated, Keyboard, Platform, StatusBar, ToastAndroid, TouchableOpacity, UIManager, View } from 'react-native'
import axios from 'axios'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { useMainContext } from '../../contexts/MainContext'
import { IcBackArrow, IcCheck, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { Button, Header, InputField, Text } from '../../components'
import { loginUser } from '../../redux'
import * as styles from './styles'


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const LoginScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const { loading } = useMainContext()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [inputField, setInputField] = useState({
    email: '',
    // username: '',
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

    if (!inputField.email) {
      newErrors.email = 'Email is required'
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
    }

    // if (!inputField.username) {
    //   newErrors.username = 'Username is required'
    //   setIsUsernameValid(false)
    // } else {
    //   setIsUsernameValid(true)
    // }

    if (!inputField.password) {
      newErrors.password = 'Password is required'
      setIsPasswordValid(false)
    } 
    // else if (inputField.password.length < 8) {
    //   newErrors.password = 'Password length must be greater than 8'
    //   setIsPasswordValid(false)
    // } 
    else {
      setIsPasswordValid(true)
    }

    setErrors(newErrors)
    shake()
    return Object.keys(newErrors).length === 0
  }

  // handle submit function using axios and redux
  // const handleSubmit = async () => {
  //   if (!handleValidations()) {
  //     return 
  //   }
  //   else {
  //     setErrors({
  //       email: '',
  //       username: '',
  //       password: ''
  //     })

  //     const body = {
  //       username: inputField.username,
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
  //       const response = await axios('https://dummyjson.com/user/login', options);
  //       if(response.status === 200) {
  //         setLoading(false);
  //         const data = response.data
  //         ToastAndroid.show('Succesfully Login', ToastAndroid.SHORT);
  //         dispatch(loginUser(data))
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


  const handleSubmit = async () => {
    if (!handleValidations()) {
      return;
    }

    const email = inputField?.email;
    const password = inputField?.password;

    try {
      setLoading(true); 
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('userCredential: ', userCredential)
      if(userCredential) {
        setLoading(false);
        ToastAndroid.show('Succesfull Registration', ToastAndroid.SHORT);
        // dispatch(registerUser(userCredential.user));
      }

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const linkedGoogleAccount = await userCredential.user.linkWithCredential(googleCredential);
      console.log('Google account linked: ', linkedGoogleAccount.user);
      return linkedGoogleAccount.user;
      // navigation.navigate('Login')
    }
    catch (error) {
      console.error('Error during sign-up or linking:', error);
      throw error;
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

  const googleButtonSignIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});
    const { user, idToken } = await GoogleSignin.signIn();
    console.log('user: ', user);
    if(user) {
      dispatch(loginUser(user));
    }
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredentials);
  }

  const handleForgetPasswordPress = () => {
    setErrors({
      email: '',
      // username:'',
      password: ''
    })
    setInputField({
      email: '',
      // username: '',
      password: ''
    })
    // setIsUsernameValid(false);
    setIsEmailValid(false);
    setIsPasswordValid(false);
    navigation.navigate('ForgetPassword')
  }

  return (
    <View style={styles.mainView()}>
      <View style={styles.topContainer()}>
        <StatusBar translucent backgroundColor={color.primary} barStyle={'dark-content'} />
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
        <Animated.View style={[styles.inputView(), errors.email && { transform: [{ translateX: shakeAnim }] }]}>
          <InputField
            error={errors.email}
            value={inputField?.email}
            placeholder={'Email'}
            label={'Email'}
            onChangeText={(val) => handleChange(val, 'email')}
            keyboardType='default'
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
        {/* <Animated.View style={[styles.inputView(), errors.username && { transform: [{ translateX: shakeAnim }] }]}>
          <InputField
            error={errors.username}
            value={inputField?.username}
            placeholder={'Username'}
            label={'Username'}
            onChangeText={(val) => handleChange(val, 'username')}
            keyboardType='default'
            editable={loading ? false : true}
            icon
            iconPlace='right'
            renderRightIcon={() => (
              errors.username ?
                (<IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />)
                : isUsernameValid && (<IcCheck width={size.moderateScale(24)} height={size.moderateScale(24)} />)
            )}
          />
          {errors.username ?
            (<Text style={styles.errorText()}>{errors.username}</Text>)
            : (<Text style={styles.noError()}></Text>)
          }
        </Animated.View> */}
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
        <TouchableOpacity style={styles.textAlignRight()} activeOpacity={0.5} onPress={handleForgetPasswordPress}>
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
          <TouchableOpacity onPress={googleButtonSignIn} style={styles.button()}>
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