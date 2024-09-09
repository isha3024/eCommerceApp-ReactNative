import React, { useEffect, useState, useContext, createContext } from 'react'
import { LogLevel, OneSignal } from 'react-native-onesignal';

import { ONE_SIGNAL_APP_ID } from '../config';

const OneSignalContext = createContext();

export const OneSignalProvider = ({ children }) => {
  const [foregroundNotification, setForegroundNotification] = useState(null);
  const [openedNotification, setOpenedNotification] = useState(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONE_SIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  useEffect(() => {
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent) => {
      let notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData;
      setForegroundNotification(notification);
    })

    OneSignal.Notifications.addEventListener('click', (newNotification) => {
      setOpenedNotification(newNotification);
    })

    return () => {
      OneSignal.Notifications.clearAll();
    }
  }, [])

  return (
    <OneSignalContext.Provider
      value={{
        foregroundNotification,
        openedNotification,
        isPermissionGranted
      }}
    >
      {children}
    </OneSignalContext.Provider>
  )
}

export const useNotificationContext = () => {
  const value = useContext(OneSignalContext);
  if (value === undefined)
    throw new Error('Tried to use notification context without a provider');
  return value;
}