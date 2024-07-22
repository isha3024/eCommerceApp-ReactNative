import { View, ActivityIndicator, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import { color, IcBackArrow, IcCamera, images } from '../../theme';
import * as styles from './styles';
import { Button, Header, Text } from '../../components';

export const CameraScreen = () => {

  const camera = useRef(null)
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [hasPermission, setHasPermission] = useState(false)
  const devices = useCameraDevices();
  console.log('devices:==>', devices)
  const cameraDevice = devices.back;

  useEffect(() => {
    const getUserPermission = async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log('newCameraPermission:==> ', newCameraPermission);
      setHasPermission(newCameraPermission === 'granted');
    };

    getUserPermission();
  }, []);

  const captureImage = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log('image.path:==> ', photo.path);
    }
  }

  if (!hasPermission) {
    return <ActivityIndicator size="small" color={color.error} />;
  }

  if (cameraDevice === null) {
    return <ActivityIndicator size="large" color={color.error} />
  }

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
        <ImageBackground source={images.VisualSearchImage} style={styles.bgImage()}>
          <View style={styles.centeredView()}>
            <Text style={styles.searchText()}>Search for an outfit by taking a photo or uploading an image</Text>
            <Button 
              title='TAKE A PHOTO'
            />
            <Button 
              title='UPLOAD AN IMAGE'
              border
              btnStyle={styles.buttonBorder()}
              btnTextStyle={styles.buttonText()}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
