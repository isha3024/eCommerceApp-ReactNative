import React, { useState } from 'react'
import { LayoutAnimation, Platform, StatusBar, TouchableOpacity, UIManager, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as styles from './styles'
import { IcBackArrow, IcCheck, IcCheckMark, IcClose, IcFacebook, IcForwardArrow, IcGoogle, color, size } from '../../theme'
import { EmailValidation } from '../../utils/functions'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const RegisterScreen = () => {

  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'linear', 'opacity')
    );
    setExpanded(!expanded);
    if(handleValidations()){
      setErrors({
        name: '',
        email: '',
        password: ''
      })
      navigation.navigate('Login')
    }
  }

  const handleValidations = () => {
    let newErrors = {};
    if(!formData.name){
      newErrors.name = 'Name is required'
    }

    if(!formData.email) {
      newErrors.email = 'Email is required'
    }else if (!EmailValidation(formData.email)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
    }
    if(!formData.password) {
      newErrors.password = 'Password is required'
    }else if(formData.password.length < 8){
      newErrors.password = 'Password length must be greater than 8'
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    else{
      return true;
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
          value={formData.name}
          placeholder={'Name'}
          label={'Name'}
          onChangeText={(val) => {
            handleChange('name', val)
            handleValidations()
          }}
          keyboardType='default'
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.name ? (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            ): <IcCheckMark width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.success} />
          )}
        />
        {errors.name && expanded && (
         <Text style={styles.errorText()}>{errors.name}</Text>
        )}
        <InputField 
          error={errors.email}
          value={formData.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={(val) => {
            handleChange('email', val)
            handleValidations()
            }}
          keyboardType='email-address'
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.email ? (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            ): null
          )}
        />
        {errors.email && expanded && (
         <Text style={styles.errorText()}>{errors.email}</Text>
        )}
        <InputField
          error={errors.password}
          value={formData.password}
          placeholder={'Password'}
          label={'Password'}
          onChangeText={(val) => {
            handleChange('password', val)
            handleValidations()
            }}
          keyboardType='default'
          icon
          iconPlace='right'
          renderRightIcon={() => (
            errors.password ? (
              <IcClose width={size.moderateScale(24)} height={size.moderateScale(24)} color={color.error} />
            ): null
          )}
        />
        {errors.password && expanded && (
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
