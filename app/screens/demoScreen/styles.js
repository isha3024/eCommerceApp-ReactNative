import { color, fonts, fontSize, size } from '../../theme';

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary,
});

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
  elevation: size.moderateScale(3)
});

export const middleView = () => ({
  flex: 1
});

export const markerContainer = () => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [{translateX: size.moderateScale(-10)}, {translateY: size.moderateScale(-10)}],
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const visibleMarkers = () => ({
  position: 'absolute',
  bottom: '15%',
  right: '5%',
  zIndex: 1,
  width: size.moderateScale(150),
  paddingVertical: size.moderateScale(8)
});

export const locationTextView = () => ({
  backgroundColor: color.lightOrange,
  position: 'absolute',
  zIndex: size.moderateScale(1),
  top: '50%',
  left: '50%',
  transform: [{translateX: size.moderateScale(-50)}, {translateY: size.moderateScale(-65)}],
  padding: size.moderateScale(10),
  borderRadius: size.moderateScale(5)
});

export const locationText = () => ({
  fontSize: fontSize.verySmall,
  fontFamily: fonts.metropolisSemiBold,
  color: color.veryDarkGray
});

export const lightDarkMode = () => ({
  position: 'absolute',
  top: size.moderateScale(10),
  right: size.moderateScale(10),
  height: size.moderateScale(40),
  width: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: size.moderateScale(10),
});

export const bottomView = () => ({
  position: 'absolute',
  zIndex: size.moderateScale(1),
  bottom: size.moderateScale(20),
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: size.deviceWidth,
  paddingHorizontal:  size.moderateScale(15),
});

export const staticBtnText = () => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: size.moderateScale(15),
  paddingVertical: size.moderateScale(5),
  backgroundColor: color.lightOrange,
  borderRadius: size.moderateScale(5)
});

export const btnText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleSmall,
  fontFamily: fonts.metropolisSemiBold,
  textTransform: 'uppercase'
});

export const grantPermissionView = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: size.moderateScale(10),
  backgroundColor: color.primary,
  zIndex: -1
});

export const grantPermissionText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular,
});

export const grantPermissionBtn = () => ({
  paddingVertical: size.moderateScale(5),
  paddingHorizontal: size.moderateScale(15),
  backgroundColor: color.lightOrange,
  borderRadius: size.moderateScale(5),
});

export const grantPermissionBtnText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisBold,
});

export const sliderView = () => ({
  position: 'absolute',
  bottom: size.moderateScale(60),
  paddingLeft: size.moderateScale(16),
  zIndex: size.moderateScale(1)
});

export const sliderItemView = () => ({
  backgroundColor: color.primary,
  width: size.deviceWidth - 100,
  paddingHorizontal: size.moderateScale(10),
  paddingVertical: size.moderateScale(10),
  borderRadius: size.moderateScale(5),
});

export const nameOfCity = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisBold,
  textAlign: 'left'
});

export const mapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "saturation": "-100"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "saturation": -5
      },
      {
        "color": "#ffffff"
      },
      {
        "lightness": -5
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      },
      {
        "weight": 1.2
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#4d6059"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4d6059"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#4d6059"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": 21
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#4d6059"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4d6059"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7f8d89"
      },
      {
        "lightness": 17
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#7f8d89"
      },
      {
        "lightness": 29
      },
      {
        "weight": 0.2
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 18
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#7f8d89"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 19
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#2b3638"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2b3638"
      },
      {
        "lightness": 17
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#24282b"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#24282b"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }
]