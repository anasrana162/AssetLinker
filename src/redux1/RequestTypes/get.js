import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Common} from '../../config';
import {store} from '../index';
import {loaderStart, loaderStop, logoutUser} from '../actions';

let state = store.getState()?.reducer;
let user_authentication = state?.token;
console.log(user_authentication, 'user_authentication from get1234');

axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;

function storeUpdate() {
  state = store.getState()?.reducer;
  user_authentication = state?.token;

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user_authentication}`;



}

export default async function getApi(
  endpoint,
  successToast = true,
  startLoader = true,
  showError = true,
  defaultError = true,
) {
  storeUpdate();
  if (startLoader) {
    loaderStart();
  }
  try {
    const response = await axios.get(endpoint);
    loaderStop();
    {
      successToast
        ? Toast.show({
            text1: response.data.message,
            type: 'success',
            visibilityTime: 5000,
          })
        : null;
    }
    return response.data;
  } catch (e) { 
    loaderStop();
   
  if (
      e.message.includes('timeout of ') &&
      e.message.includes('ms exceeded')
    ) {
      Toast.show({
        text1: "Can't connect to server",
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.message && showError) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
    
  //  else if (e?.response?.status==401) {
  //     Toast.show({
  //       text1: 'Session timeout 123',
  //       type: 'error',
  //       visibilityTime: 1000,
  //     });
  //     logoutUser();
  //   }
    else if (defaultError) {
      Toast.show({
        text1: e.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
   
    return null;
  }
}
