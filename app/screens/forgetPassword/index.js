import React, { useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import * as styles from './styles'
import { IcBackArrow, IcClose, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'
import { EmailValidation } from '../../utils/functions'

export const ForgetPassword = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputField, setInputField] = useState({
    email: '',
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
        email: ''
      })
      navigation.navigate('Login')
    }
  }

  const handleValidations = () => {
    let newErrors = {};
    if(!inputField.email){
      newErrors.email = 'Email is required'
    }
    else if(EmailValidation(inputField.email)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
    }

    setErrors(newErrors)
    shake()
    return Object.keys(newErrors).length === 0
  }

  const handleNavigation = () => {
    setErrors({
      email: '',
    })
    setTimeout(() => {
      navigation.goBack()
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
        leftIconPress={handleNavigation}
      />
        <Text style={styles.mainTitleText()}>Forget Password</Text>
      </View>
      <View style={styles.middleContainer()}>
        <Text style={styles.text()}>
        Please, enter your email address. You will receive a link to create a new password via email.
        </Text>
        <Animated.View style={[styles.inputView(), errors.email && { transform: [{ translateX: shakeAnim }] }]}>
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
        <Button activeOpacity={0.8} btnStyle={styles.buttonWithText()} title='SEND' disabled={false} onPress={handleSubmit} />
      </View>
      </Screen>
  )
}
