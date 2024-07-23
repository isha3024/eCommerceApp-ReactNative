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
  Image,
  Modal,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

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
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

export const CaptureImageScreen = () => {
  const scaleImage = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const pinchRef = createRef();
  const panRef = createRef();

  const camera = useRef(null);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);

  const device = useCameraDevice(cameraPosition);

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

  const openImageModal = () => {
    setShowModal(true);
  };

  const alertNoMedia = () => {
    Alert.alert(
      'No Media',
      'You have not taken any photos yet. Please take a photo and try again.',
      [{text: 'OK'}],
      {cancelable: false},
    );
  };

  const slideImages = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activePhoto) {
      setActivePhoto(slide);
    }
  };

  const onPinchEvent = Animated.event([{nativeEvent: scaleImage}], {
    useNativeDriver: true,
  });

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === STATE.ACTIVE) {
      setPanEnabled(true);
    }
    const handleScale = nativeEvent.scaleImage;
    if (handleScale < 1) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      setPanEnabled(false);
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
            <TouchableOpacity activeOpacity={0.7} onPress={openImageModal}>
              <Image
                source={{uri: 'file://' + photos[photos.length - 1].path}}
                style={styles.thumNail()}
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
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        {showModal && (
          <StatusBar
            backgroundColor={color.mostlyBlack}
            barStyle="light-content"
          />
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          style={styles.imageScrollView()}
          onScroll={slideImages}
          contentContainerStyle={{alignItems: 'center'}}>
          {[...photos].reverse().map((photo, index) => (
            <View key={index}>
              <PanGestureHandler
                onGestureEvent={onPanEvent}
                ref={panRef}
                simultaneousHandlers={[pinchRef]}
                enabled={panEnabled}
                failOffsetX={[-1000, 1000]}
                shouldCancelWhenOutside>
                <Animated.View>
                  <PinchGestureHandler
                    ref={pinchRef}
                    onGestureEvent={onPinchEvent}
                    simultaneousHandlers={[panRef]}
                    onHandlerStateChange={handlePinchStateChange}>
                    <Animated.Image
                      source={{uri: 'file://' + photo.path}}
                      style={[
                        styles.fullImage(),
                        {transform: [{scale: scaleImage}, {translateX}, {translateY}]},
                      ]}
                    />
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </View>
          ))}
        </ScrollView>
      </Modal>
    </>
  );
};
