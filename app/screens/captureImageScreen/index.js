import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  // Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, PinchGestureHandler} from 'react-native-gesture-handler';


import {Header, Text} from '../../components';
import {
  color,
  IcBackArrow,
  IcCamera,
  IcError,
  IcFlash,
  IcSync,
  IcVideo,
  size,
} from '../../theme';
import * as styles from './styles';

export const CaptureImageScreen = () => {

  const navigation = useNavigation()

  const camera = useRef(null);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);

  const device = useCameraDevice(cameraPosition);

  useFocusEffect(useCallback(() => {
    StatusBar.setBackgroundColor(color.primary);
    StatusBar.setBarStyle('dark-content')
  }))

  const getUserPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (
      cameraPermission === 'denied' ||
      cameraPermission === 'not-determined'
    ) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
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

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.current.takePhoto({
        flash: flash,
        qualityPrioritization: 'balanced',
      });
      setPhotos([...photos, photo]);
      CameraRoll.saveAsset(`file://${photo.path}`, {type: 'photo'});
      console.log('photos:: ', photos);
      setPhotoTaken(true);
      setTimeout(() => {
        setPhotoTaken(false);
      }, 50);
    } catch (error) {
      console.log('error:: ', error);
    }
  };

  const alertNoMedia = () => {
    Alert.alert(
      'No Media',
      'You have not taken any photos yet. Please take a photo and try again.',
      [{text: 'OK'}],
      {cancelable: false},
    );
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
    return <Text style={{color: color.error}}>No access to camera!</Text>;
  }

  if (device === null) {
    return <Text style={{color: color.error}}>No device selected!</Text>;
  }

  return (
    <>
      <View style={styles.topView()}>
        <StatusBar
          translucent
          backgroundColor={color.primary}
          barStyle="dark-content"
        />
        <Header
          title
          headerTitle="Search by taking a photo"
          headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return <IcBackArrow />;
          }}
        />
      </View>
      <View style={styles.cameraView()}>
        {device != null ? (
          <Camera
            ref={camera}
            resizeMode="cover"
            style={[StyleSheet.absoluteFill, {flex: 1}]}
            isActive={true}
            device={device}
            photo={true}
          />
        ) : (
          <View style={styles.noCamera()}>
            <Text style={styles.noCameraText()}>No camera found</Text>
          </View>
        )}
        {photoTaken && <View style={styles.photoTakenOverlay()} />}
      </View>
      <View style={styles.bottomView()}>
        <View style={styles.cameraButtonView()}>
          {photos.length > 0 ? (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('imagesScreen', {photos : [...photos]})}>
              <Animated.Image
                source={{uri: 'file://' + photos[photos.length - 1].path}}
                style={styles.thumNail()}
                sharedTransitionTag="imageFullScreen"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={alertNoMedia}
              style={styles.noMedia()}>
              <IcError />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.cameraButton()}
            activeOpacity={0.7}>
            <IcCamera />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFlipCameraPressed}
            style={styles.cameraReverse()}
            activeOpacity={0.7}>
            <IcSync
              fill={
                cameraPosition === 'front' ? color.secondary : color.mostlyBlack
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cameraIconsView()}>
        <TouchableOpacity
          onPress={onFlashPressed}
          style={styles.cameraFlash()}
          activeOpacity={0.7}>
          <IcFlash
            fill={flash === 'on' ? color.secondary : color.mostlyBlack}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
