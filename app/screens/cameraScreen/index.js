import { View, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { color, IcBackArrow, images } from '../../theme';
import { Button, Header, Text } from '../../components';
import * as styles from './styles';

export const CameraScreen = () => {

  const navigation = useNavigation()
  
  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <StatusBar translucent backgroundColor={color.primary} barStyle='dark-content' />
        <Header 
          title
          headerTitle='Visual Search'
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
        />
      </View>
      <View style={styles.visualSearchWrapper()}>
        <ImageBackground source={images.VisualSearchImage} resizeMode='cover' style={styles.bgImage()}>
          <View style={styles.centeredView()}>
            <Text style={styles.searchText()}>Search for an outfit by taking a photo or uploading an image</Text>
            <Button 
              activeOpacity={0.9}
              title='TAKE A PHOTO'
              onPress={() => navigation.navigate('captureImageScreen')}
            />
            <Button 
              title='UPLOAD AN IMAGE'
              border
              textWhite
              btnStyle={styles.buttonBorder()}
              btnTextStyle={styles.buttonText()}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
