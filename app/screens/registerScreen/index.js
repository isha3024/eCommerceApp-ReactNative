import React, { useState } from 'react'
import { Platform, StatusBar, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as styles from './styles'
import { IcBackArrow, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputField, setInputField] = useState({
    name: '',
    email: '',
    password: ''
  })
  
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

  return (
    <Screen withScroll bgColor={color.primary} style={styles.mainView()}>
    <StatusBar
      translucent={true}
    />
      <Header
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(15)} />)
        }}
      />
      <View style={styles.topContainer()}>
        <Title title={'Sign up'} />
      </View>
      <View style={styles.middleContainer()}>
        <InputField 
          error={errors.name}
          value={inputField?.name}
          placeholder={'Name'}
          label={'Name'}
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
        {errors.name &&  (
         <Text style={styles.errorText()}>{errors.name}</Text>
        )}
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
        {errors.email &&  (
         <Text style={styles.errorText()}>{errors.email}</Text>
        )}
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
        {errors.password && (
         <Text style={styles.errorText()}>{errors.password}</Text>
        )}
        <View style={styles.textAlignRight()}>
          <Text style={styles.text()}>Already have an account?</Text>
          <TouchableOpacity style={styles.iconView()} activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
            <IcForwardArrow width={size.moderateScale(15)} height={size.moderateScale(10)} />
          </TouchableOpacity>
        </View>
        {/* <Button btnStyle={styles.buttonWithText()} title={'SIGN UP'} disabled={false} onPress={() => navigation.navigate('Login')} /> */}
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
