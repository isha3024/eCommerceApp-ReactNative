import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button, Screen, Text} from '../../components';
import {Header} from '../../components/header';
import {InputBox} from '../../components/inputBox';
import {addRefer, getAllCourseList} from '../../redux';
import {IcBackArrow, IcCheckMark, color, images} from '../../theme';
import {NumberValidation} from '../../utils/functions';
import * as styles from './styles';

export const ReferScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focus, setFocus] = useState(false);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  console.log('🚀 ~ ReferScreen ~ selectedCourses:', selectedCourses);
  const [layout, setLayout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLayout(true);
    }, 500);
  }, []);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const courseList = async () => {
    try {
      const res = await dispatch(getAllCourseList());
      if (res.status) {
        setCoursesList(res?.data);
        // LayoutAnimation.configureNext({
        //   duration: 300,
        //   update: {
        //     type: LayoutAnimation.Types.easeInEaseOut,
        //   },
        // });
      }
    } catch (error) {
      console.log('🚀 ~ courseList ~ error:', error);
    }
  };

  const getCourseList = async () => {
    // let referBody = {
    //   name: name,
    //   mobile_no: mobileNumber,
    //   student_courses: selected,
    // };
    // // console.log('🚀 ~ createReferral ~ referBody:', referBody);
    try {
      const res = await dispatch(getAllCourseList());
      console.log('🚀 ~ getCourseList ~ res:', res);
      setCoursesList(res?.data);
    } catch (error) {
      console.log('🚀 ~ courseList ~ error:', error);
    }
  };
  const addReferral = async () => {
    let referBody = {
      name: name,
      mobile_no: mobileNumber,
      student_courses: selectedCourses,
      referral_remarks: remarks,
    };
    console.log('🚀 ~ addReferral ~ referBody:', referBody);
    try {
      const res = await dispatch(addRefer(referBody));
      console.log('🚀 ~ addReferral ~ res:', res);
      if (res.status) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        navigation.navigate('homeScreen');
      }
    } catch (error) {
      console.log('🚀 ~ addReferral ~ error:', error);
    }
  };

  const onCoursePress = courseId => {
    setSelectedCourses(prevSelectedCourses => {
      if (prevSelectedCourses.includes(courseId)) {
        return prevSelectedCourses.filter(id => id !== courseId);
      } else {
        return [...prevSelectedCourses, courseId];
      }
    });
    console.log('🚀 ~ onCoursePress ~ courseId:', courseId);
  };

  useEffect(() => {
    courseList();
    getCourseList();
  }, [
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    }),
  ]);

  useEffect(() => {
    setIsButtonDisabled(!(name && mobileNumber && selectedCourses.length > 0));
  }, [name, mobileNumber, selectedCourses, remarks]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('homeScreen');
        return true;
      };

      const Back = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => Back.remove();
    }, []),
  );

  return (
    <View style={styles.mainView()}>
      <Header
        headerWithTitle
        title
        headerTitle={'Refer Student'}
        headerStyle={styles.headerCustomStyle()}
        headerTitleTextCustomStyle={styles.headerTextStyle()}
        headerCustomLeftIcon
        headerLeftIcon={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('homeScreen');
              }}
              style={styles.leftView()}>
              <IcBackArrow />
            </TouchableOpacity>
          );
        }}
      />
      <Screen style={styles.rootView()}>
        <ScrollView>
          <View style={styles.inputBoxView()}>
            <InputBox
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={name}
              onChangeText={val => {
                setName(val);
              }}
              placeholder={'Enter Name'}
              placeholderTextColor={color.customBlack(0.5)}
              customStyle={styles.inputBoxStyle(focused)}
            />
            <InputBox
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={mobileNumber}
              maxLength={10}
              onChangeText={val => {
                if (NumberValidation(val)) {
                  setMobileNumber(val);
                }
              }}
              keyboardType="numeric"
              placeholder={'Enter Mobile No.'}
              placeholderTextColor={color.customBlack(0.5)}
              customStyle={styles.inputBoxStyleTwo(isFocused)}
            />
            {coursesList.length > 0 && (
              <Text style={styles.headingText()}>Select Course(s)</Text>
            )}
            <View style={styles.checkBoxContainer()}>
              {coursesList.map((item, index) => {
                const courseIsSelected = selectedCourses.includes(item?._id);
                return (
                  <TouchableOpacity
                    style={styles.checkBoxView()}
                    key={index}
                    onPress={() => {
                      onCoursePress(item?._id);
                    }}>
                    <View style={styles.checkBox(layout)}>
                      {courseIsSelected && (
                        <Image
                          source={images?.ImgCheck}
                          style={styles.checkImage()}
                        />
                      )}
                    </View>
                    <Text style={styles.courseNameText()}>
                      {item.course_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <InputBox
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={remarks}
              // maxLength={10}
              onChangeText={val => {
                // if (NumberValidation(val)) {
                setRemarks(val);
                // }
              }}
              maxLength={200}
              multiline
              // keyboardType="numeric"
              placeholder={'Remarks'}
              placeholderTextColor={color.customBlack(0.5)}
              customStyle={styles.inputBoxStyleThree(focus)}
            />
          </View>
          <Button
            btnStyle={styles.submitBtnStyle()}
            disabled={isButtonDisabled}
            title={'Submit'}
            onPress={() => {
              addReferral();
            }}
          />
        </ScrollView>
      </Screen>
      {/* <Image source={images.imgBackDrop} style={styles.backDropImage()} /> */}
    </View>
  );
};
