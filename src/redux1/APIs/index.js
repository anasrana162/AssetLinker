import { Common, NavService } from '../../config';
import Toast from 'react-native-toast-message';
import postApi, { fetchApi } from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
// import putApi from '../RequestTypes/put';
// import * as EmailValidator from 'email-validator';
import {
  loaderStart,
  loaderStop,
  logoutUser,
  saveToken,
  saveUser,
} from '../actions';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import moment from 'moment';
import { store } from '../Middleware';
import deleteApi from '../RequestTypes/delete';
import PasswordValidator from 'password-validator';
let user_authentication = store.getState()?.reducer.token;

console.log('seemm', user_authentication);
// var passwordValidator = require('password-validator');
// var schema = new passwordValidator();
// schema.is().min(8).is().max(100);

function dispatch(action) {
  store.dispatch(action);
}
const strongRegex =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';

export async function socialSignin(
  user_social_token,
  user_social_type,
  email,
  role,
) {
  const paramData = {
    user_social_token,
    user_social_type,
    email,
    role,
    user_device_type: Platform.OS,
    user_device_token: 'FCMTOKEN',
  };
  const data = await postApi('social-login', paramData);
  console.log(data, 'social login data--');
  if (data?.data?.verified == 0) {
    saveToken(data?.data?.user_authentication);
    NavService.navigate(
      role == 'politician' ? 'PoliticianCompleteProfile' : 'CompleteProfile',
      data?.data,
    );
    console.log(data, 'social login data12--');

    // saveUser(data?.data);
  }
  if (data?.status == 1 && data?.data?.verified == 1) {
    saveUser(data?.data);
    saveToken(data?.data?.user_authentication);
  } else {
  }
}
export async function login(email, password) {
  loaderStart();

  const params = {
    phone: email,
    password,
  };
  const data = await postApi('user/signin', params, false, true, true, true);
  console.log(params, '====>><<');
  loaderStop();
  if (data?.status == 1) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });
    setTimeout(() => {
      saveToken(data?.data?.token);
      saveUser(data?.data);
    }, 300);
  }
}

export async function plotAdd(
  price,
  areaSelected,
  selectedCategoryType,
  furnished,
  Bedroom,
  Bathroom,
  AreaUnit,
  constructionState,
  des,
  title,
  selectcategory,
  multipleAssetsPost,
  yard,
  yardbtn,
  phase,
  location,
  locationType,
  userId,
  rentsale
) {

  // loaderStart();

  const paramData = {
    price: price,
    area: areaSelected,
    plotDescription: des,
    plotTitle: title,
    plotType: selectcategory,
    yard: yardbtn,
    phase: phase,
    plotImage: multipleAssetsPost,
    bedrooms: Bedroom,
    bathrooms: Bathroom,
    areaUnit: AreaUnit,
    constructionState: constructionState,
    furnished: furnished,
    plotCategory: selectedCategoryType,
    location,
    locationtype: locationType,
    yardNumber: yard,
    userId,
    saleRent: rentsale
  };
  console.log('====================================');
  console.log(paramData);
  console.log('====================================');
  const data = await postApi(
    'user/addPlot',
    paramData,
    true,
    true,
    true,
    true,
    true,
  );

  // loaderStop();

  console.log(data, 'Plot');
  if (data?.status == 1) {
    NavService.goBack();
  }
  //   Toast.show({
  //     text1: data?.Message,
  //     type: 'success',
  //     visibilityTime: 3000,
  //   });
  //   setTimeout(() => {
  //     saveToken(data?.data?.token);
  //     saveUser(data?.data);
  //   }, 300);
  // }
}


// chat 

export async function sendMessage(
  paramData
) {
  loaderStart();


  console.log('===================paramData=================');
  console.log(paramData);
  console.log('====================================');
  const data = await postApi(
    'send-message',
    paramData,

  );

  loaderStop();

  if (data?.status == 1) {

    console.log(data, 'send-message');
  }

}

//conversation id
export async function postConversationId(senderId, receiverId, plotId) {
  const paramsdata = {
    receiverId: receiverId,
    senderId: senderId,
    plotId: plotId
  }
  console.log('===============paramsdata====conversation=================', paramsdata);
  console.log('====================================');
  const data = await postApi(`api/conversations`, paramsdata);
  console.log('===============Conversatio id MESSAGES =====================');
  console.log(data);
  console.log('====================================');
  return data?._id
}
//get messages

export async function getMessages(conversationId) {
  console.log('===============conversationId=====================');
  console.log(conversationId);
  console.log('====================================');
  const data = await getApi(`get-messages/${conversationId}`, false, true, false, false);

  console.log('===============GET MESSAGES =====================');
  console.log(data);
  console.log('====================conversationId================');
  return data;
}

//get plot data
export async function getPlotData() {
  const data = await getApi(`user/getAllplots`, false, true, false, false);

  return data;
}

//plot favourite

export async function makePlotfavourite(plotId, role, isfavourite) {
  // loaderStart();
  const paramsData = {
    plotId,
    role,
    isfavourite,
  };
  console.log('====================================');
  console.log(paramsData);
  console.log('====================================');

  const data = await postApi(
    'user/userFavouriteProjects',
    paramsData,
    null,
    false,
    true,
    true,
    false,
  );

  // loaderStop();

  console.log(data, 'fav');
  // if (data?.status == 1) {
  //   Toast.show({
  //     text1: data?.Message,
  //     type: 'success',
  //     visibilityTime: 3000,
  //   });
  //   setTimeout(() => {
  //     saveToken(data?.data?.token);
  //     saveUser(data?.data);
  //   }, 300);
  // }
}

//plot comments
export async function CommentOnPost(plotId, commentDes) {
  // loaderStart();
  const paramsData = {
    plotId,
    commentDes,
  };
  console.log('====================================');
  console.log(paramsData);
  console.log('====================================');

  const data = await postApi(
    'user/comment',
    paramsData,
    null,
    false,
    true,
    true,
    false,
  );

  // loaderStop();

  console.log(data, 'fav');
}

//comment plot display

export async function CommentDisplay(id) {
  const data = await getApi(`user/getComment/${id}`, false, true, false, false);
  return data?.newArr;
}

//fav list dispalsy
export async function FavListDisplay() {
  const data = await getApi(`user/favProjectList`, false, true, false, false);
  console.log('=======favourite list =============================');
  console.log(data);
  console.log('====================================');
  return data?.DataSend;
}

// user/specificUsersRole/seller find account of specific role

export async function getUserByRole(role) {
  const data = await getApi(
    `user/specificUsersRole/${role}`,
    false,
    true,
    false,
    false,
  );
  return data?.userAvailable;
}

//all users get
export async function getAllUser() {
  const data = await getApi(`user/AllUsers`, false, true, false, false);
  return data?.userAvailable;
}
//user projects by using  id

export async function getUserProjectsById(id) {
  const data = await getApi(
    `user/userPostPlot/${id}`,
    false,
    true,
    false,
    false,
  );
  return data;
}
//get filter by options
export async function getFilterdByChoice(
  AreaSelect,
  CategorySelect,
  plotType,
  Price,
  saleRent

) {
  let queryString = '';

  //single search
  if (
    AreaSelect !== '' &&
    plotType == '' &&
    Price == '' &&
    CategorySelect == ''
  ) {
    queryString = `user/filter?area=${AreaSelect}`;
  } else if (
    AreaSelect == '' &&
    plotType !== '' &&
    Price == '' &&
    CategorySelect == ''
  ) {
    queryString = `user/filter?plotType=${plotType}`;
  } else if (
    AreaSelect == '' &&
    plotType == '' &&
    Price !== '' &&
    CategorySelect == ''
  ) {
    queryString = `user/filter?price=${Price}`;
  } else if (
    AreaSelect == '' &&
    plotType == '' &&
    Price == '' &&
    CategorySelect !== ''
  ) {
    queryString = `user/filter?plotCategory=${CategorySelect}`;
  }
  else if (
    AreaSelect == '' &&
    plotType == '' &&
    Price == '' &&
    CategorySelect == '' &&
    saleRent !== ''

  ) {
    queryString = `user/filter?saleRent=${saleRent}`;
  }
  else if (
    AreaSelect == '' &&
    plotType !== '' &&
    Price == '' &&
    CategorySelect !== ''
  ) {
    queryString = `user/filter?plotCategory=${CategorySelect}&plotType=${plotType}`;
  } else if (
    AreaSelect == '' &&
    plotType !== '' &&
    Price !== '' &&
    CategorySelect !== ''
  ) {
    queryString = `user/filter?plotCategory=${CategorySelect}&plotType=${plotType}&price=${Price}`;
  } else if (
    AreaSelect !== '' &&
    plotType !== '' &&
    Price !== '' &&
    CategorySelect !== ''
  ) {
    queryString = `user/filter?plotCategory=${CategorySelect}&plotType=${plotType}&price=${Price}&area=${AreaSelect}`;
  } else {
    queryString = `user/filter?plotCategory=${CategorySelect}&plotType=${plotType}&price=${Price}&area=${AreaSelect}&=saleRent=${saleRent}`;
  }
  console.log('====================================');
  console.log(queryString);
  console.log('====================================');
  const data = await getApi(queryString, false, true, false, false);
  console.log(data, 'API FILTER ');
  // if (data?.status == 1) {
  //   return data?.allProducts;
  // }
  return data?.newArr;
}

//grt filters by search bar

export async function getSearchbarFilter(item) {
  const data = await getApi(
    `user/filterSeach/${item}`,
    false,
    true,
    false,
    false,
  );
  console.log(data);
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);

  return data?.newArr;
}

//my projects
export async function getMyProjects() {
  const data = await getApi(`user/getPlotDetails`, false, true, false, false);
  console.log(data);
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);
  if (data?.status == 1) {
    return data?.plot;
  }
  return;
}
//get my fav project listing listFav

export async function getAllFavList() {
  const data = await getApi(`user/listFav`, false, true, false, false);
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);
  if (data?.status == 1) {
    return data;
  }
  return;
}
//////////////////////////////////////////////////////////////////////////
//completed
export async function verifyCode(user_id, verification_code) {
  const params = {
    user_id,
    verification_code,
  };

  const data = await postApi('verify-user', params);
  console.log(data.data, 'DATA--');
  if (data?.status == 1) {
    Toast.show({
      text1: data?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    dispatch({ type: 'SAVE_TOKEN', payload: data?.data?.user_authentication });
    const DataPassed = {
      data: data?.data,
      role: role,
    };
    NavService.navigate('CompleteProfile', DataPassed);

    // navigation.navigate('CompleteProfile', data?.data);
  } else {
  }
}
//forget password OTP app
export async function verifyForgetCode(user_id, otp) {
  console.log(otp, 'DATA');
  const params = {
    user_id,
    otp,
  };

  const data = await postApi(
    'user/verifyaccount',
    params,
    null,
    true,
    true,
    true,
  );
  if (data?.status == 1) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });
    const DataPassed = {
      user_id: data?.user,
    };
    NavService.navigate('ChangePassword', DataPassed);

    // navigation.navigate('CompleteProfile', data?.data);
  } else {
  }
}

//edit plot users detauils

export const updateUserDetails = async (
  userName,
  email,
  StateName,
  firmName,
  area,
  landline,
  image,
  mime,
  previousWork,
  details,
  officeName,
  experience,
  location,
) => {
  const paramData = new FormData();
  paramData.append('userName', userName);
  paramData.append('email', email);
  paramData.append('stateName', StateName);
  paramData.append('firmName', firmName);

  paramData.append('area', area);
  paramData.append('landline', landline);
  paramData.append('previousWork', previousWork);

  paramData.append('description', details);

  paramData.append('officeName', officeName);

  paramData.append('experience', experience);

  paramData.append('location', location);
  console.log('========PARAMSDAYA============================');
  console.log(paramData);
  console.log('====================================');

  if (image) {
    paramData.append('image', {
      uri: image,
      name: `Profile${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
      type: mime,
    });
  }

  const data = await postApi(
    'user/editProfile',
    paramData,
    null,
    true,
    true,
    true,
    true,
  );
  console.log('====================================');
  console.log(data);
  console.log('====================================');

  if (data?.status == 1) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });

    saveToken(data?.user?.token);
    saveUser(data?.user);
    NavService.goBack();
  }
};

/// update location
export const updateLocation = async area => {
  const data = await getApi(
    `user/filter?area=${area}`,
    false,
    true,
    false,
    false,
  );

  return data?.newArr;
};

//fav list for heart clour
export async function getAlreadyFavourutes() {
  const data = await getApi(`user/favList`, false, true, false, false);
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);
  if (data?.status == 1) {
    return data;
  }
  return;
}

export async function getMSIDFilter(item) {
  const data = await getApi(
    `user/filterMsSeach/${item}`,
    false,
    true,
    false,
    false,
  );
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);
  if (data) {
    return data;
  }
  return;
}

export async function getUserDetails(id) {
  const data = await getApi(
    `user/otherProfile/${id}`,
    false,
    true,
    false,
    false,
  );
  // const data = await getApi(`user/filterSeach/${item}`, null, false, true, true, true);
  if (data) {
    return data?.availableUser;
  }
  return;
}

export async function getratings(id) {
  const data = await getApi(`user/avgrate/${id}`, false, true, false, false);
  if (data) {
    return data;
  }
  return;
}

export async function postRating(userId, rating, plotId) {
  const paramData = {
    userId,
    rating,
    plotId,
  };

  const data = await postApi(
    'user/rate',
    paramData
  );
  console.log('====================================');
  console.log(data);
  console.log('====================================');
}

///++???
export async function completeProfile(name, gender, image, age, mime, role) {
  const params = {
    name: name,
    gender: gender,
    profilePicture: image,
    age: age,
  };
  const paramData = new FormData();
  paramData.append('name', name);

  paramData.append('gender', gender);
  paramData.append('age', age);
  paramData.append('profilePicture', {
    uri: image,
    name: `Profile${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });

  const data = await fetchApi(
    'user/update-profile',
    paramData,
    false,
    true,
    true,
    true,
  );
  console.log(data, 'data complete profile');
  if (data?.status == 1) {
    Toast.show({
      text1: data?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    dispatch({ type: 'SAVE_USER', payload: data?.user });

    // dispatch( )
    // NavService.reset(0, [{name: 'AppStack'}]);
    // onPress={() => NavService.reset(0, [{name: 'AppStack'}])}

    // NavService.navigate('CompleteProfile',data?.user )
  } else {
  }
}

//completed
export async function resendVerifyCode(user_id) {
  const params = {
    user_id,
  };

  const data = await postApi('resend-code', params);
  console.log(data);
  if (data?.status == 1) {
    Toast.show({
      text1: data?.message,
      type: 'success',
      visibilityTime: 3000,
    });
  } else {
  }
}

//completed
export async function signup(params) {
  loaderStart();

  const data = await postApi(
    'user/signup',
    params,
    null,
    true,
    true,
    true,
    true,
  );
  loaderStop();
  if (data?.user?.role == 'builder' && data?.user?.isApproved == false) {
    Toast.show({
      text1: 'Contact to Asset Linker for account verification',
      type: 'success',
      visibilityTime: 2000,
    });
    NavService?.goBack();
  }
  if (
    (data?.status == 1 && data?.user?.role == 'consultant') ||
    data?.user?.role == 'seller'
  ) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });
    saveUser(data.user);
    saveToken(data?.user?.token);
  }
  console.log('New data', data);
  // loaderStart()
  // const role = roles.toLowerCase();
  // const params = {
  //   name,
  //   email,
  //   password,
  //   confirm_password,
  //   role,
  //   user_device_type: Platform.OS,
  //   user_device_token: fcmToken ? fcmToken : 'FCMTOKEN',
  // };
  // console.log('sssss', params);
  // const data = await postApi('register', params, null, true, true, true);
  // // loaderStop()
  // if (data?.status == 1) {
  //   console.log('signup-->', data);
  //   Toast.show({
  //     text1: data?.message,
  //     type: 'success',
  //     visibilityTime: 3000,
  //   });
  //   const dataNavigate = {
  //     user_id: data?.data?.user_id,
  //     role: role,
  //   };
  //   NavService.navigate('OTPSignUP', dataNavigate);
  // } else {
  // }
}

//completed app
export async function forgetPassword(phone) {
  const params = {
    "phone": phone,
  };

  const data = await postApi(
    'user/forgetpassword',
    params,
    false,
    true,
    true,
    true,
  );
  if (data?.status == 1) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });
    const passedData = {
      user_id: data?.data,
    };
    NavService.navigate('OTP', passedData);
  } else {
  }
}
//completed
export async function resetPassword(user_id, password, cpassword) {
  const params = {
    userId: user_id,
    newPassword: password,
    confirmNewPassword: cpassword,
  };

  const data = await postApi('user/newpassword', params);
  console.log(data, 'datataa');
  if (data.status == 1) {
    Toast.show({
      text1: data?.Message,
      type: 'success',
      visibilityTime: 3000,
    });
    NavService.reset(0, [{ name: 'AuthStack' }]);
    // navigation.reset(0, [{name: 'AuthStack'}]);
  } else {
  }
}

export async function resendForgetPasswordCode(email) {
  const data = await getApi(`user/password/reset?email=${email}`);
}
var schema = new PasswordValidator();

// Add properties to it
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .symbols();
export async function changePassword(old_password, password, new_password) {
  const params = {
    old_password,
    new_password,
  };
  const data = await postApi('change-password', params);

  if (data?.status == 1) {
    NavService.goBack();
  }
}

export async function logout() {
  loaderStart();
  await fetchApi('user/signout', null, true, true);
  logoutUser();
  setTimeout(() => {
    loaderStop();
    Toast.show({
      text1: 'Logout successfully',
      type: 'success',
      visibilityTime: 2000,
    });
  }, 500);
}

//complete and update profile

export async function updateProfile(
  name,
  gender,
  age,
  profilePicture,
  party,
  mime,
  role,
  update,
) {
  const paramData = new FormData();
  paramData.append('name', name);
  paramData.append('gender', gender);
  paramData.append('age', age);
  if (profilePicture) {
    paramData.append('profilePicture', {
      uri: profilePicture,
      name: `Profile${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
      type: mime,
    });
  }
  paramData.append('party', party);

  console.log(paramData, 'sseemaa');
  const response = await fetchApi('update-profile', paramData, true, true);
  console.log(response, 'RESPONSE12');
  if (response?.status == 1 && update == 'edit') {
    NavService.goBack();
    saveUser(response.user);

    // NavService.navigate('AppStackNavigator');
    // NavService.reset(0, [{name: 'AppStackNavigator'}]);
  } else if (response?.status == 1) {
    saveUser(response.user);
    Toast.show({
      text1: 'Profile created successfully',
      type: 'success',
      visibilityTime: 3000,
    });
    NavService.reset(0, [{ name: 'AppStack' }]);
  }

  return;
}

export const updateCompleteProfile = async (
  name,
  gender,
  age,
  profilePicture,
  party,
  mime,
  role,
  update,
) => {
  const paramData = new FormData();
  paramData.append('name', name);
  paramData.append('gender', gender);
  paramData.append('age', age);
  paramData.append('profilePicture', {
    uri: profilePicture,
    name: `Profile${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });
  paramData.append('party', party);

  console.log('user_authentication123', paramData);
  loaderStart();
  await fetch('http://server.appsstaging.com:3059/api/update-profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user_authentication}`,
    },
    body: paramData,
  })
    .then(res => res.json())
    .then(response => {
      console.log('edit complete profile', response);
      if (response?.status == 1) {
        saveUser(response.user);
        saveToken(response?.user?.user_authentication);
        if (update == 'edit') {
          return Toast.show({
            text1: response.message,
            type: 'success',
            visibilityTime: 3000,
          });
        } else {
          return Toast.show({
            text1: 'Profile created successfully',
            type: 'success',
            visibilityTime: 3000,
          });
        }
      }
    })
    .catch(error => {
      console.error('Error is', error);
    })
    .finally(() => {
      loaderStop();
    });
};
export async function getPolicies(type) {
  const response = await getApi(`content?type=${type}`, false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function getCategories() {
  const response = await getApi('categories', false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function getSlides() {
  const response = await getApi('slides', false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function getVideos() {
  const response = await getApi(`videos`, false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function getRooms() {
  const response = await getApi('rooms', false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function getNotifications() {
  const response = await getApi('notification', false, false, false, false);
  console.log('notification', response);
  return response;
}

export async function getQuizzes() {
  const response = await getApi('tests', false);
  if (response?.data?.length) return response?.data;
  return [];
}

export async function purchaseApi(receipt, type) {
  const params = {
    receipt,
    type,
    source: Platform.OS == 'ios' ? 'apple' : 'google',
  };
  const response = await postApi(`subscription`, params);
  console.log('Purchase response', response);
  if (response?.status == 1) {
    saveUser(response?.data?.user);
    NavService.goBack();
  }
  return;
}

//Core Module
//usr don3
export async function eventCreate(
  title,
  eventPicture,
  details,
  lat,
  long,
  venue,
  date,
  mime,
  role,
) {
  // const params = {
  //   title,
  //   eventPicture,
  //   details,
  //   lat,
  //   long,
  //   venue,
  //   date,
  // };
  const paramData = new FormData();
  paramData.append('title', title);
  paramData.append('eventPicture', {
    uri: eventPicture,
    name: `event${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });
  paramData.append('details', details);
  paramData.append('lat', lat);
  paramData.append('long', long);
  paramData.append('venue', venue);
  paramData.append('date', date);

  const response = await fetchApi('createEvent', paramData, true, true);
  console.log(response, 'RESPONSE---1');
  if (response?.status == 1) {
    Toast.show({
      text1: response?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    setTimeout(() => {
      NavService.goBack();
    }, 800);
    // saveUser(response.user);
    // console.log("Event Created");
    // NavService.navigate('AppStackNavigator');
    // NavService.reset(0, [{name: 'AppStackNavigator'}]);
  } else if (response?.status == 0) {
    Toast.show({
      text1: response?.message,
      type: 'success',
      visibilityTime: 3000,
    });
  }

  return;
}
//get all events
export async function allEventGet() {
  const data = await getApi(`getEvents`, false, true, false, false);
  console.log('EVENT GET', data);
  return data;
}
//get event details
export async function getEventDetails(id) {
  const data = await getApi(`eventDetail/${id}`, false, true, false, false);
  console.log('EVENT DETAILS GET', data);
  return data;
}

//create article
export async function articleCreate(articleText, articlePicture, mime, role) {
  const paramData = new FormData();
  paramData.append('articleText', articleText);
  if (articlePicture) {
    paramData.append('articlePicture', {
      uri: articlePicture,
      name: `Profile${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
      type: mime,
    });
  }
  console.log('PARAMD--123detail123', paramData);
  const response = await fetchApi('createArticle', paramData, true, true);
  console.log(response, 'RESPONSEZZZZ');

  if (response?.status == 1) {
    Toast.show({
      text1: response?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    setTimeout(() => {
      NavService.goBack();
    }, 800);
  }

  return;
}

//get all articles
export async function allArticleGet() {
  const data = await getApi(`getArticles`, false, true, false, false);
  return data;
}

//get article details
export async function getArticleDetails(id) {
  const data = await getApi(`articleDetail/${id}`, false, true, false, false);
  return data;
}

//post comment
export async function CommmentPost(articleId, comment, role) {
  const params = {
    articleId,
    comment,
  };
  const response = await postApi(
    'postComment',
    params,
    false,
    true,
    true,
    true,
  );
  if (response?.status == 1) {
    Toast.show({
      text1: response?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    // setTimeout(() => {
    //   NavService.goBack();
    // }, 1000);
  }

  return;
}

//comment show

//get all arti and event
export async function allArticleEventGet() {
  const data = await getApi(`getAll`, false, true, false, false);
  // console.log('Article and Event GET', data);
  return data;
}

//create Itinerary
export async function createItineraryy(
  itineraryTitle,
  itineraryPicture,
  startDate,
  endDate,
  plan,
  mime,
  role,
) {
  const params = {
    itineraryTitle,
    // itineraryPicture,
    startDate,
    endDate,
    plan: JSON.stringify(plan),
  };
  const plans = JSON.stringify(plan);
  const paramData = new FormData();
  paramData.append('itineraryTitle', itineraryTitle);
  paramData.append('itineraryPicture', {
    uri: itineraryPicture,
    name: `event${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });
  paramData.append('startDate', startDate);
  paramData.append('endDate', endDate);
  paramData.append('plan', plans);
  const response = await fetchApi('addItinerary', paramData, true, true);
  if (response?.status == 1) {
    Toast.show({
      text1: response?.message,
      type: 'success',
      visibilityTime: 3000,
    });
    setTimeout(() => {
      NavService.goBack();
    }, 500);
  }
  //   // saveUser(response.user);
  //   // console.log("Event Created");
  //   // NavService.navigate('AppStackNavigator');
  //   // NavService.reset(0, [{name: 'AppStackNavigator'}]);
  // }

  return;
}

export async function ReportPost(type, id) {
  const params = {
    type,
    articleId: id,
  };
  const response = await postApi('isReport', params, false, true, true, true);

  return;
}

export async function getItinerary() {
  const data = await getApi(`myItinerary`, false, true, false, false);
  return data;
}

//update itinerary
export async function updateItinerary(plan, id, navigation) {
  const paramsDatas = {
    plan: JSON.stringify(plan),
  };

  const response = await postApi(
    `updateItinerary/${id}`,
    paramsDatas,
    null,
    true,
    true,
  );

  if (response?.status == 1) {
    // NavService.goBack()
    navigation.pop('2');
  }

  return;
}

//delete itinerary
export async function deleteItinerary(id) {
  await deleteApi(`deleteItinerary/${id}`, null, false, true, true, true);

  return;
}

//get famous
export async function getFamous() {
  const data = await getApi(`getFamousPlaces`, false, true, false, false);

  return data;
}
export async function getTermsCondition() {
  const data = await getApi(`getFamousPlaces`, false, true, false, false);

  return data;
}

export const event = (
  title,
  eventPicture,
  details,
  lat,
  long,
  venue,
  date,
  mime,
  role,
) => {
  const paramData = new FormData();
  paramData.append('title', title);
  paramData.append('eventPicture', {
    uri: eventPicture,
    name: `event${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });
  paramData.append('details', details);
  paramData.append('lat', lat);
  paramData.append('long', long);
  paramData.append('venue', venue);
  paramData.append('date', date);

  console.log('user_authentication1', user_authentication);
  loaderStart();
  fetch('http://server.appsstaging.com:3059/api/createEvent', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user_authentication}`,
    },
    body: paramData,
  })
    .then(res => res.json())
    .then(response => {
      console.log('edit', response);
    })
    .catch(error => {
      console.error('Error is', error);
    })
    .finally(() => {
      loaderStop();
    });
};

//delete user
export async function deleteUser() {
  const response = await fetchApi('deleteUser', null, true, true);
  if (response?.status == 1) {
    Toast.show({
      text1: 'User deleted successfully',
      type: 'success',
      visibilityTime: 3000,
    });
    logoutUser();
  }

  return;
}

export const articles = (articleText, articlePicture, mime) => {
  const paramData = new FormData();
  paramData.append('articleText', articleText);
  paramData.append('articlePicture', {
    uri: articlePicture,
    name: `event${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
    type: mime,
  });

  console.log('user_authentication1', user_authentication);
  loaderStart();
  fetch('http://server.appsstaging.com:3059/api/createArticle', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user_authentication}`,
    },
    body: paramData,
  })
    .then(res => res.json())
    .then(response => {
      if (response?.status == 1) {
        Toast.show({
          text1: response?.message,
          type: 'success',
          visibilityTime: 3000,
        });
        setTimeout(() => {
          NavService.goBack();
        }, 800);
      } else {
        Toast.show({
          text1: response?.message,
          type: 'error',
          visibilityTime: 3000,
        });
      }
      console.log('Add article', response);
    })
    .catch(error => {
      console.error('Error in article', error);
      Toast.show({
        text1: 'Network Error',
        type: 'error',
        visibilityTime: 3000,
      });
    })
    .finally(() => {
      loaderStop();
    });
};


export const patchViews = async (id) => {
  const options = { method: 'PATCH', headers: { Authorization: user_authentication } };

  await fetch(`http://173.249.10.7:8066/user/views/${id}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
export async function getAllChatList(userId) {
  console.log('===============conversationId=====================');
  console.log(userId);
  console.log('====================================');
  // const data = await getApi(`get-messages/${conversationId}`, false, true, false, false);
  const data = await getApi(`allconversations/${userId}`, false, true, false, false);

  console.log('===============GET List chat =====================');
  console.log(data);
  console.log('====================conversationId================');
  return data;
}