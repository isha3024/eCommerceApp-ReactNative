import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, StatusBar, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Image } from 'react-native'

import * as styles from './styles'
import { Header, Text } from '../../components'
import { color, IcBackArrow, IcCamera, IcFlash, IcSync, size } from '../../theme'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

export const CaptureImageScreen = () => {
  const camera = useRef(null);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photoTaken, setPhotoTaken] = useState(false); 
  const [hasPermission, setHasPermission] = useState(null);
  // const { hasPermission } = useCameraPermission();
  const device = useCameraDevice(cameraPosition)

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
  }, [])

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'))
  }, [])

  const takePhoto = async () => {
    try {
      const photo = await camera.current.takeSnapshot({
        flash: flash
      })
      CameraRoll.saveAsset(photo.path, 'photo')
      setPhotoTaken(true);
      setTimeout(() => {
        setPhotoTaken(false); 
      }, 200);
    } catch (error) {
      console.log('error:: ', error)
    }
  }

  const getUserPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log(cameraPermission);
    if (cameraPermission === 'denied' || cameraPermission === 'not-determined') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setHasPermission(true);
      } else {
        console.log('Camera permission denied');
        setHasPermission(false);
      }
    } else if (cameraPermission === 'authorized') {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  };

  useEffect(() => {
    getUserPermission();
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      getUserPermission();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return <Text style={{ color: color.error }}>No access to camera!</Text>;
  }

  if (device === null) {
    return <Text style={{ color: color.error }}>No device selected!</Text>;
  }
  return (
    <>
      <View style={styles.topView()}>
        <StatusBar translucent backgroundColor={color.primary} barStyle='dark-content' />
        <Header
          title
          headerTitle='Search by taking a photo'
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
        />
      </View>
      <View style={styles.cameraView()}>
        {
          device != null
          ? (
              <Camera
                ref={camera}
                resizeMode='cover'
                style={[StyleSheet.absoluteFill, { flex: 1 }]}
                isActive={true}
                device={device}
                photo={true}
              />
            )   
            : (
              <View style={styles.noCamera()}>
                <Text style={styles.noCameraText()}>No camera found</Text>
              </View>
            )
        }
        {photoTaken && (
          <View style={styles.photoTakenOverlay()} />
        )}
      </View>
      <View style={styles.bottomView()}>
        <TouchableOpacity onPress={onFlashPressed} style={styles.cameraButtonIcons()} activeOpacity={0.7}>
          <IcFlash fill={flash === 'on' ? color.secondary : color.mostlyBlack} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePhoto()} style={styles.cameraButton()} activeOpacity={0.7}>
          <IcCamera />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFlipCameraPressed} style={styles.cameraButtonIcons()} activeOpacity={0.7}>
          <IcSync fill={cameraPosition === 'front' ? color.secondary : color.mostlyBlack} />
        </TouchableOpacity>
      </View>
    </>
  )
}
