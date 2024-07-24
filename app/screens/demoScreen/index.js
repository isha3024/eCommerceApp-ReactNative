import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Header, Screen } from '../../components';
import { color, IcBackArrow, IcMoon, size } from '../../theme';
import * as styles from './styles';
// import Geolocation from 'react-native-geolocation-service';

export const DemoScreen = () => {

  const mapRef = useRef(null)
  const [darkMode, setDarkMode] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false)
  // const [userLocation, setUserLocation] = useState({})

  const mapDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  }



  // const goToCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     async position => {
  //       const currentLong = await JSON.stringify(position.coords.longitude);
  //       const currentLat = await JSON.stringify(position.coords.latitude);

  //       console.log(currentLat, currentLong)
  //     },
  //     error => {
  //       console.log(error);
  //       Alert.alert('Error', 'Could not get your location.');
  //     },
  //     { enableHighAccuracy: false, timeout: 15000, maximumAge: 1000 }
  //   )
  // }

  // componentDidMount() {
  //   if (permissionGranted) {
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // }

  // useEffect(() => {
  //   // if (store.getState().authReducer.userLoginResponse != null) {
  //     Geolocation.requestAuthorization('always');
  //     Geolocation.getCurrentPosition(
  //       async position => {
  //         setUserLocation(position.coords);
  //         // setIsViewCentered(true);
  //       },
  //       // {enableHighAccuracy: true},
  //       error => {
  //         console.error(error);
  //         // setIsViewCentered(false);
  //         setUserLocation({latitude: 0, longitude: 0});
  //       },
  //       {enableHighAccuracy: true},
  //     );
  //     // const watchId = Geolocation.watchPosition(
  //     //   position => {
  //     //     setUserLocation(position.coords);
  //     //   },
  //     //   error => console.error(error),
  //     //   {
  //     //     enableHighAccuracy: true,
  //     //     distanceFilter: 10,
  //     //   },
  //     // );
  //     // return () => {
  //     //   Geolocation.clearWatch(watchId);
  //     // };
  //   // }
  //   // })();
  // }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log('granted:::', granted)
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show your location',
            [{ text: 'OK' }]
          )
          setPermissionGranted(false)
        }
        else {
          setPermissionGranted(true)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    const checkPermissionGranted = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          setPermissionGranted(granted);
        }
        catch (err) {
          console.log(err)
        }
      }
    };

    checkPermissionGranted()
  }, [])

  return (
    <Screen bgColor={color.primary} style={styles.mainView()} translucent={true}>
      <Header
        title
        headerTitle='Google Maps API'
        headerStyle={styles.header()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }}
      />
      <View style={styles.middleView()}>
        <>
          {
            permissionGranted
            ? (
              <>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={StyleSheet.absoluteFillObject}
                  customMapStyle={darkMode ? styles.mapStyle : []}
                  initialRegion={{
                    latitude: 22.310696,
                    longitude: 73.192635,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  // onRegionChangeComplete={data => console.log('data:: ', data)}
                >
                  <Marker
                    coordinate={{
                      latitude: 22.310696,
                      longitude: 73.192635,
                    }}
                    title='Test'
                    // onPress={data => console.log('markerPress:: ', data.nativeEvent.coordinate)}
                  />
                </MapView>
                <TouchableOpacity activeOpacity={0.7} onPress={mapDarkMode} style={styles.lightDarkMode()}>
                  <IcMoon darkColor={color.mostlyBlack} width={size.moderateScale(30)} height={size.moderateScale(30)} />
                </TouchableOpacity>
                {/* <TouchableOpacity activeOpacity={0.7} onPress={goToCurrentLocation} style={styles.goToHomeBtn()}>
                  <Text style={styles.goToHomeBtnText()}>Go To Home</Text>
                </TouchableOpacity> */}
              </>
            )
            : (
              <View style={styles.grantPermissionView()}>
              <Text style={styles.grantPermissionText()}>Grant Location Permission to view Map</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={requestLocationPermission} style={styles.grantPermissionBtn()}>
                <Text style={styles.grantPermissionBtnText()}>Grant</Text>
              </TouchableOpacity>
              </View>
            )
          }
        </>
      </View>
    </Screen>
  );
};


