import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TouchableOpacity, UIManager, View, Keyboard, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { OneSignal } from 'react-native-onesignal'
import auth, { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


import { EmailValidation, sendNotification, sendNotificationToUser } from '../../utils/functions'
import { ONE_SIGNAL } from '../../config'
import { uploadNewUserToFireStore } from '../../firebase'
import { useNotificationContext } from '../../contexts/OneSignalContext'
import { useMainContext } from '../../contexts/MainContext'
import { setUser } from '../../redux'
import { Button, Header, InputField, Text } from '../../components'
import { IcBackArrow, IcCheck, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import * as styles from './styles'


if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isPermissionGranted } = useNotificationContext();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const { userInfo } = useSelector(state => state.authUser);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [inputField, setInputField] = useState({
    name: '',
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
    }
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
  //         dispatch(setUser(body))
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
  
  // const sendPushNotification = async (userUID) => {
  //   const notificationData = {
  //     app_id: "e021a68b-28d9-45da-9be9-c6325b954c97",
  //     include_external_user_ids: [userUID],
  //     headings: { "en": "Welcome!" },
  //     contents: { "en": "Thank you for registering!" }
  //   };

  //   try {
  //     const response = await axios.post('https://onesignal.com/api/v1/notifications', notificationData, {
  //       headers: {
  //         'Authorization': `Basic NjVkZTFhOGQtMGQ3ZS00MDU4LThhMTMtNmM1ZTA1ODAwNjU5`,  // Add your REST API Key here
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log('Push notification sent successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error sending push notification:', error);
  //   }
  // }
  
  const handleSubmit =  () => {
    if (!validateForm()) {
      return;
    }
  
    const { name, email, password } = inputField;
  
    setLoading(true);
  
    auth().createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        return firebase.firestore().collection('users').doc(user.uid).set({
          uid: user.uid,
          name: name,
          email: user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
          .then(() => {
            dispatch(setUser({ uid: user.uid, email: user.email, name }));
            setInputField({
              name: '',
              email: '',
              password: '',
            });
            setErrors({
              email: '',
              username: '',
              password: ''
            });
            // navigation.navigate('bottomStackNavigation');
            ToastAndroid.show('Congrats, You have registered successfully!', ToastAndroid.SHORT);
          });
      })
      .catch((error) => {
        console.log('error: ', error);
        setLoading(false);
  
        switch (error.code) {
          case 'auth/email-already-in-use':
            ToastAndroid.show('Email already exists, Use Different Email', ToastAndroid.SHORT);
            break;
          case 'auth/invalid-email':
            ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
            break;
          case 'auth/weak-password':
            ToastAndroid.show('Weak Password', ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };  

  const googleButtonSignIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});
    const { user, idToken } = await GoogleSignin.signIn();
    console.log('user: ', user);
    if(user) {
      dispatch(setUser(user));
    }
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredentials);
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


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '559773031110-un6tfom1klu53dqm9c6fbon57b94vf5d.apps.googleusercontent.com',
      offlineAccess: true,
    })
  },[])

  useEffect(() => {
    if(userInfo) {
      uploadNewUserToFireStore(userInfo)
    }
  },[userInfo])

  useEffect(() => {
      OneSignal.User.pushSubscription.getIdAsync().then(res => {
        console.log(
          '🚀 ~ OneSignal.User.pushSubscription.getIdAsync ~ res:',
          res,
        );
      });
  }, [navigation]);

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
