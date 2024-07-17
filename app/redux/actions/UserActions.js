import {
  _deleteAccount,
  _generateOtp,
  _imageList,
  _logout,
  _profile,
  _referredList,
  _verifyOtp,
  _addRefer,
  _getAllCourseList,
  _getReferList,
  _getNotificationList,
  _getProfileReferredList,
  _notificationStatusUpdate,
  _userAdd,
} from '../../services';
import * as actions from '../Types';
import Toast from 'react-native-toast-message';

// user login
export const generateOtp = body => {
  return () => {
    return _generateOtp(body)
      .then(response => {
        body.isRegistered != false &&
          Toast.show({
            type: 'success',
            text1: response.data.otp,
          });
        return response;
      })
      .catch(error => {
        // Toast.show({
        //   type: 'error',
        //   text1: error.message,
        // });
        throw error;
      });
  };
};

export const verifyOtp = body => {
  return dispatch => {
    return _verifyOtp(body)
      .then(response => {
        if (response) {
          Toast.show({
            type: 'success',
            text1: response.message,
          });
          // AsyncStorage.setItem('UserLogin', response?.data?.u_id);
          dispatch({
            type: actions.USER_LOGIN,
            payload: {
              userLoginResponse: response.data,
              isUserLogin: body?.isUserLogin,
            },
          });
          return response;
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const referredList = (id, isStudent) => {
  return () => {
    return _referredList(id, isStudent)
      .then(response => {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const imageList = data => {
  return () => {
    return _imageList(data)
      .then(response => {
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const logout = body => {
  return dispatch => {
    return _logout(body)
      .then(response => {
        // Toast.show({
        //   type: 'success',
        //   text1: response.message,
        // });

        return response;
      })

      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const deleteAccount = () => {
  return () => {
    return _deleteAccount()
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};
export const profile = data => {
  return () => {
    return _profile(data)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};
export const getAllCourseList = () => {
  return () => {
    return _getAllCourseList()
      .then(response => {
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};

export const getReferList = () => {
  return () => {
    return _getReferList()
      .then(response => {
        // console.log('🚀 ~ getReferList ~ response:', response);
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const getProfileReferList = (id, isStudent) => {
  return () => {
    return _getProfileReferredList(id, isStudent)
      .then(response => {
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};

export const getNotificationList = () => {
  return () => {
    return _getNotificationList()
      .then(response => {
        return response;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        throw error;
      });
  };
};
export const addRefer = body => {
  return () => {
    return _addRefer(body)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log('🚀 ~ addRefer ~ error:', error);
        throw error;
      });
  };
};
export const notificationStatusUpdate = (u_id, body) => {
  return () => {
    return _notificationStatusUpdate(u_id, body)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log('🚀 ~ addRefer ~ error:', error);
        throw error;
      });
  };
};

export const setUserLoggedIn = () => {
  return dispatch => {
    dispatch({
      type: actions.SET_USER_LOGGED_IN,
      payload: {
        isUserLogin: true,
      },
    });
  };
};

export const setUserLoggedOut = () => {
  return dispatch => {
    dispatch({
      type: actions.SET_USER_LOGGED_OUT,
      payload: {
        isUserLogin: false,
      },
    });
  };
};
