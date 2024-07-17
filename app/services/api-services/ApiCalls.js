// import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../redux';
import * as actions from '../../redux/Types';
import {getCredentials} from '../../utils';
import HttpCalls from './HttpCalls';
import {headersData} from './Services';

// INFO: all APIs added here

// const getToken = () => {
//   return store.getState().authReducer.userLoginResponse.token;
// };

const getToken = async () => {
  try {
    let res = await getCredentials();
    if (res) {
      return res?.token;
    } else {
      await AsyncStorage.removeItem('isLoginIndex');
      await store.dispatch({
        type: actions.USER_LOGOUT,
      });
      await store.dispatch({
        type: actions.USER_LOGIN,
        payload: {
          userLoginResponse: null,
        },
      });
      return null;
    }
  } catch (e) {
    console.log('token error', e);
  }
};

// user login
export const _generateOtp = async body => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({});
  return _api_calls('POST', '/generate-otp', headers, body);
};

export const _userAdd = async body => {
  console.log('in API CALLS file')
  let {_api_calls} = HttpCalls;
  let headers = await headersData({});

  return _api_calls('POST', '/user-add', headers, body);
}

//verify Otp
export const _verifyOtp = async body => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({});
  return _api_calls('POST', '/login', headers, body);
};
export const _referredList = async (id, isStudent) => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls(
    'GET',
    `/profile-referral-list/${id}?is_student=${isStudent}`,
    headers,
  );
};
export const _imageList = async () => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('GET', '/image', headers);
};

export const _profile = async () => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('GET', '/profile', headers);
};

// get all course list.
export const _getAllCourseList = async () => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('GET', '/courses', headers);
};
export const _logout = async body => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });

  return _api_calls('POST', `/log-out`, headers, body);
};

// add a referral.
export const _addRefer = async body => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('POST', '/student-refer', headers, body);
};
// get referral list.
export const _getReferList = async () => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('GET', '/referred', headers);
};
export const _getProfileReferredList = async (id, isStudent) => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls(
    'GET',
    `/profile-referral-list/${id}?is_student=${isStudent}`,
    headers,
  );
};
export const _getNotificationList = async () => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('GET', '/notification', headers);
};

//deleteAccount
export const _deleteAccount = async (u_id, body) => {
  let {_api_calls} = HttpCalls;
  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('PATCH', `/deactivate`, headers, body);
};
export const _notificationStatusUpdate = async (u_id, body) => {
  let {_api_calls} = HttpCalls;
  let headers = await headersData({
    token: await getToken(),
  });
  return _api_calls('PATCH', `/notification-update/${u_id}`, headers, body);
};
