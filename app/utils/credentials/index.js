import {getRefreshAuthToken} from '../../redux';
import * as actions from '../../redux/Types';
import {store} from '../../redux';

function isTokenExpired(expirationTime) {
  if (expirationTime < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
async function getAccessUsingRefresh(refreshToken) {
  try {
    const refreshTokenData = await getRefreshAuthToken({
      refresh_token: refreshToken,
    });

    await store.dispatch({
      type: actions.USER_LOGIN,
      payload: {
        userLoginResponse: refreshTokenData,
      },
    });
    return refreshTokenData;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Propagate the error to handle it further up the chain
  }
}

async function getVerifiedKeys(keys) {
  if (keys) {
    // Check if the actual token is not expired
    if (!isTokenExpired(keys.token_exp)) {
      return keys; // Return the keys as they are still valid
    } else {
      // Actual token expired, check if refresh token is not expired

      if (!isTokenExpired(keys.refresh_token_exp)) {
        try {
          // Attempt to refresh the token
          const response = await getAccessUsingRefresh(keys.refresh_token);

          // Check if the refreshed token is valid
          if (response && response.token_exp) {
            return response;
          } else {
            // Handle the case where token refresh did not succeed
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
            await store.dispatch({
              type: actions.GET_CREDENTIALS,
              payload: {
                credentialData: null,
              },
            });
            return null;
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw error; // Propagate the error to handle it further up the chain
        }
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
        // Both actual and refresh tokens are expired, please login
        return null;
      }
    }
  } else {
    // Access not available, please login
    return null;
  }
}

export const getCredentials = async () => {
  try {
    const credentials =
      (await store.getState().authReducer.userLoginResponse) ?? null;

    const checkTokenIsVerify = await getVerifiedKeys(credentials);

    if (credentials != null && checkTokenIsVerify != null) {
      const NewCredentials = await store.getState().authReducer
        .userLoginResponse;

      return NewCredentials;
    } else {
      return null;
    }
  } catch (e) {
    // ** error for getting credentials
    return null;
    // console.log('error', e);
  }
};
