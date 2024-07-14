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
        email: ''
      })
      navigation.navigate('Login')
    }
  }

  const handleValidations = () => {
    let newErrors = {};

    if(!newErrors.email) {
      newErrors.email = 'Email is required'
    }else if (!EmailValidation(newErrors.email)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
    }

    setErrors(newErrors)
    animate()
    return Object.keys(newErrors).length === 0
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
        <Text style={styles.mainTitleText()}>Forget Password</Text>
      </View>
      <View style={styles.middleContainer()}>
        <Text style={styles.text()}>
        Please, enter your email address. You will receive a link to create a new password via email.
        </Text>
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
        <Button btnStyle={styles.buttonWithText()} title='SEND' disabled={false} onPress={handleSubmit} />
      </View>
      </Screen>
  )
}
