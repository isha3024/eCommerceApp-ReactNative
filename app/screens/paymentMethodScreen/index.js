import React, { useRef, useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as styles from './styles';
import { BottomSheetContainer, Button, Header, InputFieldBottomSheet, Text } from '../../components';
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcHelp, IcMasterCard, IcPlus, IcSearch, images } from '../../theme';


const hideCardNumber = (cardNum) => {
  const cardNumInString = cardNum.toString();
  const lastFourNum = cardNumInString.substring(12);
  const remaingNum = cardNumInString.substring(0, 12);
  const hiddenNum = '* '.repeat(remaingNum.length / 2) + lastFourNum;
  return hiddenNum;
};

const secureCardNum = hideCardNumber(1675234732693947);

export const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  const [defaultPaymentCard, setDefaultPaymentCard] = useState(true);
  const [defaultPaymentCardTwo, setDefaultPaymentCardTwo] = useState(false);
  const [showBottomSheetForNewCard, setShowBottomSheetForNewCard] = useState(false);

  const toggleCheckbox = () => {
    setDefaultPaymentCard(!defaultPaymentCard);
  };

  const toggleCheckboxTwo = () => {
    setDefaultPaymentCardTwo(!defaultPaymentCardTwo);
  };

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
        <Text style={styles.sectionTitle()}>Your payment cards</Text>
        <ScrollView
          style={styles.paymentCardsList()}
          contentContainerStyle={styles.contentContainerStyle()}
        >
          <View style={styles.paymentCardWrapper()}>
            <ImageBackground
              source={images.imgPaymentCardBG}
              resizeMode="cover"
              style={styles.image(!defaultPaymentCard)}
            >
              <View style={styles.cardDetails()}>
                <Image source={images.imgPaymentChip} />
                <Text style={styles.cardNumber()}>{secureCardNum}</Text>
                <View style={styles.cardBottom()}>
                  <View style={styles.keyValue()}>
                    <Text style={styles.textKeySmall()}>Card Holder Name</Text>
                    <Text style={styles.textKeyLarge()}>Jennyfer Doe</Text>
                  </View>
                  <View style={styles.keyValue()}>
                    <Text style={styles.textKeySmall()}>Expiry Date</Text>
                    <Text style={styles.textKeyLarge()}>05/23</Text>
                  </View>
                  <IcMasterCard textColor={color.white} />
                </View>
              </View>
            </ImageBackground>
            <View style={styles.checkboxView()}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                activeOpacity={0.7}
                style={styles.checkboxButton()}
              >
                {defaultPaymentCard ? (
                  <IcCheckBoxActive fill={color.mostlyBlack} />
                ) : (
                  <IcCheckBoxInactive />
                )}
                <Text style={styles.bodyText()}>
                  Use as default payment method
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paymentCardWrapper()}>
            <ImageBackground
              source={images.imgPaymentCardBG}
              resizeMode="cover"
              style={styles.image(!defaultPaymentCardTwo)}
            >
              <View style={styles.cardDetails()}>
                <Image source={images.imgPaymentChip} />
                <Text style={styles.cardNumber()}>{secureCardNum}</Text>
                <View style={styles.cardBottom()}>
                  <View style={styles.keyValue()}>
                    <Text style={styles.textKeySmall()}>Card Holder Name</Text>
                    <Text style={styles.textKeyLarge()}>Jennyfer Doe</Text>
                  </View>
                  <View style={styles.keyValue()}>
                    <Text style={styles.textKeySmall()}>Expiry Date</Text>
                    <Text style={styles.textKeyLarge()}>05/23</Text>
                  </View>
                  <IcMasterCard textColor={color.white} />
                </View>
              </View>
            </ImageBackground>
            <View style={styles.checkboxView()}>
              <TouchableOpacity
                onPress={toggleCheckboxTwo}
                activeOpacity={0.7}
                style={styles.checkboxButton()}
              >
                {defaultPaymentCardTwo ? (
                  <IcCheckBoxActive fill={color.mostlyBlack} />
                ) : (
                  <IcCheckBoxInactive />
                )}
                <Text style={styles.bodyText()}>
                  Use as default payment method
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomView()}>
        <TouchableOpacity
          onPress={() => setShowBottomSheetForNewCard(true)}
          activeOpacity={0.5}
          style={styles.addNewCardBtn()}
        >
          <IcPlus />
        </TouchableOpacity>
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
            keyboardType="default"
            autoCapitalize={true}
          />
          <InputFieldBottomSheet
            placeholder="Card number"
            label="Card number"
            keyboardType='numeric'
            icon
            iconPlace="right"
            renderRightIcon={() => <IcMasterCard />}
          />
            <InputFieldBottomSheet
              placeholder="Expire Date"
              label="Expire Date"
              maxLength={5}
              keyboardType='phone-pad'
            />
          <InputFieldBottomSheet
            placeholder="CVV"
            label="CVV"
            keyboardType="numeric"
            icon
            iconPlace="right"
            renderRightIcon={() => <IcHelp />}
          />
        </View>
        <TouchableOpacity
          onPress={toggleCheckboxTwo}
          activeOpacity={0.7}
          style={styles.checkboxViewBottomSheet()}
        >
          {defaultPaymentCardTwo ? (
            <IcCheckBoxActive fill={color.mostlyBlack} />
          ) : (
            <IcCheckBoxInactive />
          )}
          <Text style={styles.bodyText()}>Set as default payment method</Text>
        </TouchableOpacity>
        <Button btnStyle={styles.button()} title="ADD CARD" />
      </BottomSheetContainer>
    </View>
  );
};
