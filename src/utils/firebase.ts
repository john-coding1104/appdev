import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

export const _signInWithGoogle = async () => {
    try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return({ userInfo: response.data });
    } else {
      // sign in was cancelled by user
      return { userInfo: null };
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
        return { userInfo: null, message: 'Sign in is already in progress, ignore additional attempts' }; // Sign in is already in progress, ignore additional attempts
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return { userInfo: null, message: 'Google Play Services is not available or outdated. Please update to the latest version.' };
          // Android only, play services not available or outdated
          break;
        default:
          return { userInfo: null, message: 'An error occurred during Google Sign-In. Please try again.' };
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};