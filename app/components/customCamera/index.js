import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Camera, useCameraPermission } from 'react-native-vision-camera'



export const CustomCamera = () => {
  
  useEffect(() => {
    checkPermission();
  },[])

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  }

  return (
    <View>
      <Text>Camera</Text>
    </View>
  )
}
