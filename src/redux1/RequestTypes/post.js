import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Common, NavService} from '../../config';
import {loaderStart, loaderStop, logoutUser} from '../actions';
import {store} from '../index';
import {ToastMeassage} from '../../component/ToastMeassage/ToastMeassage'
axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;
function dispatch(action) {
  store.dispatch(action);
}
function storeUpdate() {
  let user_authentication = store.getState()?.reducer.token;
  console.log('User Auth Token', user_authentication);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user_authentication}`;
  console.log(user_authentication, 'user_authentication from post');
}
export default async function postApi(
  endpoint,
  params = null,
  isFormData = false,
  successToast = true,
  startLoader = true,
  stopLoader = true,
  formdata=false
) {
  let newParams = params;
  storeUpdate();
  if (startLoader) {
    loaderStart();
  }
  if (isFormData) {
    newParams = new FormData();

  for (let key in params) {
    if (key == 'plotImage') {
      const plotImages = params[key];
      plotImages.map(item => {
        newParams.append(key, item);
      });
      console.log('====================================');
      console.log(plotImages);
      console.log('====================================');
    } else {
      newParams.append(key, params[key]);
    }
  }
  }
  console.log(newParams, '=========================================================params');
  try {
    const response = await axios.post(endpoint, newParams, {
      headers: {
        'Content-Type': formdata ? 'multipart/form-data' : 'application/json',
        accept: 'application/json',
      },
    });
    console.log('Error====>', response);

    if (stopLoader) {
      loaderStop();
    }
    {
      successToast &&
        Toast.show({
          text1: response.data.message,
          type: 'success',
          visibilityTime: 3000,
          
        });
    }
    return response.data;
  } catch (e) {
    loaderStop();
    console.log('Error9901', e?.response);
    // if (e?.response?.status==401) {
    //   Toast.show({
    //     text1: 'Session timeout',
    //     type: 'error',
    //     visibilityTime: 1000,
    //   });
    //   logoutUser();
    // }
    if(e.response?.data?.data?.verified==0){
  // console.log("datadata",e.response.data);
  NavService.navigate('VerifyOtp',e.response?.data?.data?._id)
    }
    // if(e?.response?.data?.status==0){

    //   Toast.show({
    //     text1: e?.response?.data?.message,
    //     textStyle: {textAlign: 'center'},
    //     type: 'error',
    //     visibilityTime: 2000,
    //   });
    // }
    if (
      e?.message.includes('timeout of ') &&
      e?.message.includes('ms exceeded')
    ) {
      Toast.show({
        text1: "Can't connect to server",
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 2000,
        
      });
    } else if (e.response?.data?.message) {
      // ToastMeassage(e.response.data.message)@1234
      Toast.show({
        text1: e.response.data.message,
        // textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 2000,
      });
    } else {
      // ToastMeassage(e?.message)

      Toast.show({
        text1: e?.message,
        // textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 2000,
      });
    }
    return null;
  }
}


export async function fetchApi(
  endpoint,
  params = null,
  successToast = true,
  startLoader = true,
  token = null,
  ) {
  let user_authentication = store.getState()?.reducer.token;
console.log("user auth2123",user_authentication);
  if (startLoader) {
    dispatch({type: 'LOADER_START'});
  }
  try {
    const response = await fetch(Common.baseURL + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${user_authentication}`,
      },
      body: params,
    });
    let json = await response.json();
    console.log(json, 'response');
    console.log("responseresponse",response);
    dispatch({type: 'LOADER_STOP'});
    // {
    //   successToast
    //     ? Toast.show({
    //         text1: response.data.message,
    //         type: 'success',
    //         visibilityTime: 5000,
    //       })
    //     : null;
    // }

   
    return json;
  } catch (e) {
    console.log("Response99",e );
    dispatch({type: 'LOADER_STOP'});
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
    }
    
   
    
    else if (e.response?.data?.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else {
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