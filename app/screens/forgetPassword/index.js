import React, { useState } from 'react'
import { View } from 'react-native'
import * as styles from './styles'
import { IcBackArrow, IcClose, color, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { Button, Header, InputField, Screen, Text, Title } from '../../components'
import { EmailValidation } from '../../utils/functions'

export const ForgetPassword = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
  })

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if(handleValidations()){
      console.log('formData: ', formData)
      setErrors({
        email: ''
      })
      navigation.navigate('Login')
    }
  }

  const handleValidations = () => {
    let newErrors = {};

    if(!formData.email) {
      newErrors.email = 'Email is required'
    }else if (!EmailValidation(formData.email)){
      newErrors.email = 'Not a valid email address. Should be your@email.com'
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    else{
      console.log('formData: ', formData);
      return true;
    }
  }
  return (
    <Screen withScroll style={styles.mainView()}>
      <Header
        leftIconPress={() => navigation.goBack()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(15)} />)
        }}
      />
      <View style={styles.topContainer()}>
        <Title title='Forget Password' />
      </View>
      <View style={styles.middleContainer()}>
        <Text style={styles.text()}>
        Please, enter your email address. You will receive a link to create a new password via email.
        </Text>
        <InputField 
          error={errors.email}
          value={formData.email}
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
        {errors.email && (
         <Text style={styles.errorText()}>{errors.email}</Text>
        )}
        <Button btnStyle={styles.buttonWithText()} title='SEND' disabled={false} onPress={handleSubmit} />
      </View>
      </Screen>
  )
}
