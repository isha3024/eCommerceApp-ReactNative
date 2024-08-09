import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { BottomSheetContainer, Button, Header, InputFieldBottomSheet, Text } from '../../components';
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcHelp, IcMasterCard, IcPlus, IcSearch, images } from '../../theme';
import { useMainContext } from '../../contexts/MainContext';
import { formatCreditCardNumber } from '../../utils/functions';
import * as styles from './styles';

export const PaymentMethodScreen = () => {

  const navigation = useNavigation();
  const { 
    paymentCardDetails, 
    setPaymentCardDetails, 
    savePaymentCard, 
    paymentCardSelected, 
    setPaymentCardSelected,
    paymentCardSelectedIndex,
    setPaymentCardSelectedIndex
  } = useMainContext();

  const [cardDetails, setCardDetails] = useState({
    name : '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    defaultCard: true 
  })
  const [showBottomSheetForNewCard, setShowBottomSheetForNewCard] = useState(false);


  const toggleCheckbox = (index) => {
    if(paymentCardSelectedIndex !== index){
      setPaymentCardSelectedIndex(index)
      setPaymentCardSelected(paymentCardDetails[index])
    }
  };

  const handleAddCard = () => {
    if(!cardDetails.name || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv){
      Alert.alert(
        'Error',
        'Please fill all the fields to add a new card',
        [{ text: 'OK', onPress: () => null}]
      )
      return
    }
    setPaymentCardDetails((prevCard) => {
      if (!Array.isArray(prevCard)) {
        console.error('prevCard is not an array:', prevCard);
        return [cardDetails];
      }
      const updatePaymentCardDetails = [...prevCard, cardDetails];
      savePaymentCard(updatePaymentCardDetails)
      return updatePaymentCardDetails
    })
    setShowBottomSheetForNewCard(false)
  }

  useEffect(() => {
    if(paymentCardDetails.length === 1){
      setPaymentCardSelectedIndex(paymentCardSelectedIndex)
      setPaymentCardSelected(paymentCardDetails[paymentCardSelectedIndex])
    }
  },[paymentCardDetails])

  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <StatusBar backgroundColor={color.white} translucent={true} />
        <Header
          headerStyle={styles.header()}
          title
          headerTitle="Payment methods"
          headerLeftIcon
          leftIcon={() => <IcBackArrow />}
          leftIconPress={() => navigation.goBack()}
          headerRightIcon
          rightIcon={() => <IcSearch />}
        />
      </View>
      <View style={styles.middleView()}>
        {
          paymentCardDetails.length > 0
          ? (
            <View style={styles.paymentCardView()}>
              <Text style={styles.sectionTitle()}>Your payment cards</Text>
              <ScrollView
                style={styles.paymentCardsList()}
                contentContainerStyle={styles.contentContainerStyle()}
              >
                {
                  paymentCardDetails.map((card,index) => {
                    return (
                      <View style={styles.paymentCardWrapper()} key={index}>
                        <ImageBackground
                          source={images.imgPaymentCardBG}
                          resizeMode="cover"
                          style={styles.image(paymentCardSelectedIndex === index)}
                        >
                          <View style={styles.cardDetails()}>
                            <Image source={images.imgPaymentChip} />
                            <Text style={styles.cardNumber()}>{formatCreditCardNumber(card.cardNumber)}</Text>
                            <View style={styles.cardBottom()}>
                              <View style={styles.keyValue()}>
                                <Text style={styles.textKeySmall()}>Card Holder Name</Text>
                                <Text style={styles.textKeyLarge()}>{card.name}</Text>
                              </View>
                              <View style={styles.keyValue()}>
                                <Text style={styles.textKeySmall()}>Expiry Date</Text>
                                <Text style={styles.textKeyLarge()}>{card.expiryDate}</Text>
                              </View>
                              <IcMasterCard textColor={color.white} />
                            </View>
                          </View>
                        </ImageBackground>
                        <View style={styles.checkboxView()}>
                          <TouchableOpacity
                            onPress={() => toggleCheckbox(index)}
                            activeOpacity={0.7}
                            style={styles.checkboxButton()}
                          >
                            {
                              paymentCardSelectedIndex === index 
                              ? ( <IcCheckBoxActive fill={color.mostlyBlack} />) 
                              : (<IcCheckBoxInactive />)
                            }
                            <Text style={styles.bodyText()}>
                              Use as default payment method
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
              <View style={styles.bottomView()}>
              <LinearGradient 
                colors={['rgba(255, 255, 255, .02)','rgba(255, 255, 255, .6)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']} 
                locations={[0.1, 0.3, 0.7, 0.8]}
                start={{x: 0, y: 0}} 
                end={{x: 0, y: 1}} style={styles.linearGradient()}>
                  <TouchableOpacity
                    style={styles.addNewCardBtn()}
                    onPress={() => setShowBottomSheetForNewCard(true)}
                  >
                  <IcPlus />
                </TouchableOpacity>
                </LinearGradient>

              </View>
            </View>
          )
          : (
            <View style={styles.noPaymentCardView()}>
              <Text style={styles.noPaymentCardText()}>No payment card added !</Text>
              <Button
                title='Add Payment Card'
                btnStyle={styles.noPaymentCardBtn()}
                onPress={() => setShowBottomSheetForNewCard(true)}
              />
            </View>
          )
        }
      </View>
      <BottomSheetContainer
        isVisible={showBottomSheetForNewCard}
        onClose={() => setShowBottomSheetForNewCard(false)}
        customHeight={'65%'}
      >
        <Text style={styles.bottomSheetTitle()}>Add new card</Text>
        <View style={styles.newCardItemDetails()}>
          <InputFieldBottomSheet
            placeholder="Name on card"
            label="Name on card"
            value={cardDetails.name}
            onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
            keyboardType="default"
            autoCapitalize={true}
          />
          <InputFieldBottomSheet
            placeholder="Card number"
            label="Card number"
            maxLength={16}
            value={cardDetails.cardNumber}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
            keyboardType='numeric'
            icon
            iconPlace="right"
            renderRightIcon={() => <IcMasterCard />}
          />
          <InputFieldBottomSheet
            placeholder="Expire Date"
            label="Expire Date"
            value={cardDetails.expiryDate}
            onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
            maxLength={5}
            keyboardType='phone-pad'
          />
          <InputFieldBottomSheet
            placeholder="CVV"
            label="CVV"
            maxLength={3}
            secureTextEntry={true}
            value={cardDetails.cvv}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
            keyboardType="numeric"
            icon
            iconPlace="right"
            renderRightIcon={() => <IcHelp />}
          />
        </View>
        <TouchableOpacity
          onPress={() => setCardDetails({... cardDetails, defaultCard: !cardDetails.defaultCard})}
          activeOpacity={0.7}
          style={styles.checkboxViewBottomSheet()}
        >
          {cardDetails.defaultCard ? (
            <IcCheckBoxActive fill={color.mostlyBlack} />
          ) : (
            <IcCheckBoxInactive />
          )}
          <Text style={styles.bodyText()}>Set as default payment method</Text>
        </TouchableOpacity>
        <Button 
          btnStyle={styles.button()} 
          onPress={handleAddCard}
          title="ADD CARD" />
      </BottomSheetContainer>
    </View>
  );
};
