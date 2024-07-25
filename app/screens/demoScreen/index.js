import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform, PermissionsAndroid, Alert, ToastAndroid, FlatList, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'

import { Button, Header, Screen } from '../../components';
import { color, IcBackArrow, IcLocationPin, IcMoon, size } from '../../theme';
import * as data from '../../json'
import * as styles from './styles';


const cityLocations = data.locationData;

export const DemoScreen = () => {

  const initialLocation = {
    latitude: 22.3106,
    longitude: 73.1926,
  }
  const mapRef = useRef(null)
  const [darkMode, setDarkMode] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [updatedMarkerPos, setUpdatedMarkerPos] = useState(initialLocation)
  const [visibleMarkers, setVisibleMarkers] = useState([])
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

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
          setPermissionGranted(true);
          return true
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const mapDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  }

  const focusOnLocation = () => {
    if (initialLocation.latitude && initialLocation.longitude) {
      const newRegion = {
        latitude: parseFloat(initialLocation.latitude),
        longitude: parseFloat(initialLocation.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      setUpdatedMarkerPos({
        latitude: parseFloat(initialLocation.latitude).toFixed(4),
        longitude: parseFloat(initialLocation.longitude).toFixed(4),
      })
      setRegion(newRegion)
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000)
      }
    }
  }

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        // setLocation(position.coords);
        setRegion(position.coords)
        const newRegion = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        setUpdatedMarkerPos({
          latitude: parseFloat(position.coords.latitude).toFixed(4),
          longitude: parseFloat(position.coords.longitude).toFixed(4),
        })
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000)
        }
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message)
        // setLocation(null)
        console.log('error::: ', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      }
    )
  }

  const handleCityPress = (item) => {
    setRegion({
      latitude: (item.latitude),
      longitude: (item.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    setUpdatedMarkerPos({
      latitude: (item.latitude).toFixed(4),
      longitude: (item.longitude).toFixed(4),
    })
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000)
    }
  }

  const renderCityLocations = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleCityPress(item)} style={styles.sliderItemView()}>
        <Text style={styles.nameOfCity()}>{item.city}</Text>
      </TouchableOpacity>
    )
  }

  const handleRegionChange = (region) => {
    setUpdatedMarkerPos({
      latitude: (region.latitude).toFixed(4),
      longitude: (region.longitude).toFixed(4)
    })
  }

  const fitToMarker = () => {
    const markersInView = cityLocations.filter(marker => 
      marker.latitude <= region.latitude + region.latitudeDelta / 2 &&
      marker.latitude >= region.latitude - region.latitudeDelta / 2 &&
      marker.longitude <= region.longitude + region.longitudeDelta / 2 &&
      marker.longitude >= region.longitude - region.longitudeDelta / 2
    );
    setVisibleMarkers(markersInView);
    if(mapRef.current){
      mapRef.current.fitToCoordinates(visibleMarkers, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      })
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

  useEffect(() => {
    getLocation()
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
        {
          permissionGranted
            ? (
              <>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}
                  customMapStyle={darkMode ? styles.mapStyle : []}
                  initialRegion={region}
                  onRegionChangeComplete={handleRegionChange}
                  loadingEnabled={true}
                >
                  {
                    cityLocations.map((marker, index) => {
                      return (
                        <Marker
                          key={index}
                          coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                          }}
                          title={marker.city}
                        />
                      )
                    })
                  }
                </MapView>
                <TouchableOpacity activeOpacity={0.7} onPress={mapDarkMode} style={styles.lightDarkMode()}>
                  <IcMoon darkColor={color.mostlyBlack} width={size.moderateScale(30)} height={size.moderateScale(30)} />
                </TouchableOpacity>
                <View style={styles.bottomView()}>
                  <TouchableOpacity activeOpacity={0.7} onPress={focusOnLocation} style={styles.staticBtnText()}>
                    <Text style={styles.btnText()}>Go To Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} onPress={getLocation} style={styles.staticBtnText()}>
                    <Text style={styles.btnText()}>Detect Current Location</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.sliderView()}>
                  <FlatList
                    horizontal
                    data={cityLocations}
                    contentContainerStyle={{ gap: size.moderateScale(10) }}
                    renderItem={renderCityLocations}
                  />
                </View>
                {/* <View style={styles.markerContainer()}>
                  <IcLocationPin />
                </View>
                <View style={styles.locationTextView()}>
                  <Text style={styles.locationText()}>Latitude: {updatedMarkerPos.latitude}</Text>
                  <Text style={styles.locationText()}>Longitude: {updatedMarkerPos.longitude}</Text>
                </View> */}
                <Button
                  title='Show all Markers'
                  btnStyle={styles.visibleMarkers()}
                  onPress={fitToMarker}
                />
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
      </View>
    </Screen>
  );
};


